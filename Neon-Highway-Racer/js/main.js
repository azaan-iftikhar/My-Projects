// main.js - Core game loop and state management for Three.js Overhaul

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    
    // UI Elements
    const mainMenu = document.getElementById('mainMenu');
    const gameHUD = document.getElementById('gameHUD');
    const gameOverScreen = document.getElementById('gameOver');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    // HUD Elements
    const scoreVal = document.getElementById('scoreVal');
    const highScoreVal = document.getElementById('highScoreVal');
    const coinsVal = document.getElementById('coinsVal');
    const speedVal = document.getElementById('speedVal');
    const nitroBar = document.getElementById('nitroBar');
    const nearMissText = document.getElementById('nearMissText');
    const finalScore = document.getElementById('finalScore');
    const finalCoins = document.getElementById('finalCoins');

    // Car Selection
    let playerColor = 0xcc0000;
    document.querySelectorAll('.car-option').forEach(el => {
        el.addEventListener('click', (e) => {
            document.querySelectorAll('.car-option').forEach(c => c.classList.remove('selected'));
            e.target.classList.add('selected');
            playerColor = parseInt(e.target.getAttribute('data-color').replace('#', '0x'));
        });
    });

    // Game Constants
    const maxSpeed = 220; // Standard playable max speed
    const accel = maxSpeed / 5; // 5 seconds to max speed
    const breaking = -maxSpeed; 
    const decel = -maxSpeed / 5;
    const offRoadDecel = -maxSpeed / 2;
    const offRoadLimit = maxSpeed / 4;
    
    const nitroMult = 1.5;
    const maxNitro = 100;
    
    // Game State
    let state = 'menu'; // menu, playing, gameover
    let lastTime = 0;
    
    let player = {
        x: 0, // -1 to 1 (left to right edge of road)
        velocityX: 0, // for smooth physics steering
        z: 0, 
        speed: 0,
        nitro: maxNitro,
        score: 0,
        coins: 0,
        width: 0.15 // Logical width used for collision
    };

    let traffic = [];
    let items = []; 
    let entityIdCounter = 0;

    // Init modules
    ThreeEngine.init(gameContainer);
    Input.init();

    // Load High Score
    let highScore = localStorage.getItem('nhr_highscore') || 0;
    highScoreVal.textContent = highScore;

    function resetGame() {
        player.x = 0;
        player.velocityX = 0;
        player.speed = 0;
        player.nitro = maxNitro;
        player.score = 0;
        player.coins = 0;
        player.z = 0;
        
        ThreeEngine.reset();
        ThreeEngine.initPlayer(playerColor);
        
        traffic = [];
        items = [];
        
        for (let i = 0; i < 50; i++) {
            spawnTraffic(player.z + 200 + i * 80);
            spawnItem(player.z + 300 + i * 150);
        }
        
        updateHUD();
    }

    function spawnTraffic(z) {
        const laneX = [-0.6, -0.2, 0.2, 0.6];
        const colors = [0xffffff, 0x555555, 0x1111aa, 0xaa1111];
        traffic.push({
            id: entityIdCounter++,
            x: laneX[Math.floor(Math.random() * laneX.length)],
            z: z,
            speed: 100 + Math.random() * 100, // Traffic goes 100-200 km/h, making it feel playable and allowing smooth overtaking
            color: colors[Math.floor(Math.random() * colors.length)],
            nearMissed: false
        });
    }

    function spawnItem(z) {
        const laneX = [-0.6, -0.2, 0.2, 0.6];
        items.push({
            id: entityIdCounter++,
            x: laneX[Math.floor(Math.random() * laneX.length)],
            z: z,
            active: true
        });
    }

    function update(dt) {
        if (state !== 'playing') return;

        // Steering - Traffic Rider Physics (Velocity Based)
        const steer = Input.getSteering(); // -1 to 1
        const steerAccel = 12.0; // Snappy acceleration
        const friction = 8.0;    // Friction/drag

        // Apply steering force to velocity
        player.velocityX += steer * steerAccel * dt;
        
        // Apply friction to velocity so it naturally centers/stops when you let go
        player.velocityX -= player.velocityX * friction * dt;

        // Apply velocity to position
        player.x += player.velocityX * dt;
        
        // Hard clamp position and kill velocity if hitting wall
        if (player.x < -1.5) { player.x = -1.5; player.velocityX = 0; }
        if (player.x > 1.5) { player.x = 1.5; player.velocityX = 0; }

        // Nitro
        let currentMaxSpeed = maxSpeed;
        let isNitroActive = false;
        
        player.nitro = Math.max(0, Math.min(maxNitro, player.nitro)); // Prevent negative values

        if (Input.isNitro() && player.nitro > 0) {
            currentMaxSpeed = maxSpeed * nitroMult;
            player.nitro -= 25 * dt; // Drain nitro (takes 4s to empty)
            isNitroActive = true;
        } else if (player.nitro < maxNitro) {
            player.nitro += 10 * dt; // Recharge moderately smoothly (takes 10s to refill)
        }

        // Acceleration
        if (Input.isAccelerating()) {
            player.speed += accel * dt;
        } else if (Input.isBraking()) {
            player.speed += breaking * dt;
        } else {
            player.speed += decel * dt;
        }

        // Offroad slowdown
        if (player.x < -1 || player.x > 1) {
            if (player.speed > offRoadLimit) {
                player.speed += offRoadDecel * dt;
            }
        }

        // Smoothly clamp speed with drag
        if (player.speed > currentMaxSpeed) {
            // Apply heavy drag when overspeeding (e.g. nitro released)
            player.speed -= (maxSpeed * 1.5) * dt; 
            if (player.speed < currentMaxSpeed && Input.isAccelerating()) {
                player.speed = currentMaxSpeed;
            }
        }
        
        if (player.speed < 0) {
            player.speed = 0;
        }

        // Move player
        player.z += (player.speed * 1.2) * dt; // Slowed down from 2x multiplier for better control

        // Screen shake on nitro
        let shakeX = 0, shakeY = 0;
        if (isNitroActive) {
            shakeX = (Math.random() - 0.5) * 0.2;
            shakeY = (Math.random() - 0.5) * 0.2;
        }

        player.score += player.speed * dt * 0.1;

        updateTraffic(dt);
        checkCollisions();
        
        Audio.updateEngine(player.speed / maxSpeed);
        updateHUD();

        return { shakeX, shakeY };
    }

    function updateTraffic(dt) {
        // Move and recycle traffic (Zero Garbage Collection)
        traffic.forEach(t => {
            t.z += (t.speed * 1.2) * dt;
            
            // If car falls behind or drives too far ahead, teleport it to spawn anew
            if (t.z < player.z - 50 || t.z > player.z + 1500) {
                // Find highest Z to spawn ahead of it
                let maxZ = player.z + 200;
                traffic.forEach(other => { if (other.z > maxZ) maxZ = other.z; });
                
                const laneX = [-0.6, -0.2, 0.2, 0.6];
                t.x = laneX[Math.floor(Math.random() * laneX.length)];
                t.z = maxZ + 40 + Math.random() * 60;
                t.speed = 100 + Math.random() * 100;
                t.nearMissed = false;
            }
        });

        // Move and recycle items
        items.forEach(i => {
            if (i.z < player.z - 50 || i.z > player.z + 1500 || !i.active) {
                let maxZ = player.z + 300;
                items.forEach(other => { if (other.z > maxZ) maxZ = other.z; });
                
                const laneX = [-0.6, -0.2, 0.2, 0.6];
                i.x = laneX[Math.floor(Math.random() * laneX.length)];
                i.z = maxZ + 100 + Math.random() * 100;
                i.active = true;
            }
        });
    }

    function checkCollisions() {
        const pW = player.width; 

        traffic.forEach(t => {
            // Z collision check
            if (Math.abs(t.z - player.z) < 5) {
                // X collision check
                const dx = Math.abs(player.x - t.x);
                if (dx < pW * 2) {
                    crash();
                } else if (dx < pW * 3.5 && player.speed > 100) {
                    // Near miss logic
                    if (!t.nearMissed) {
                        t.nearMissed = true;
                        player.score += 100;
                        showNearMiss();
                        Audio.playSound('nearmiss');
                    }
                }
            } else {
                t.nearMissed = false; // reset
            }
        });

        items.forEach(i => {
            if (i.active && Math.abs(i.z - player.z) < 5) {
                const dx = Math.abs(player.x - i.x);
                if (dx < pW * 2) {
                    i.active = false;
                    player.coins++;
                    player.score += 50;
                    Audio.playSound('coin');
                }
            }
        });
    }

    function showNearMiss() {
        nearMissText.classList.remove('hidden');
        nearMissText.style.animation = 'none';
        void nearMissText.offsetWidth; // trigger reflow
        nearMissText.style.animation = 'floatUp 1s ease-out forwards';
        setTimeout(() => nearMissText.classList.add('hidden'), 1000);
    }

    function crash() {
        state = 'gameover';
        Audio.stopEngine();
        Audio.playSound('crash');
        
        if (player.score > highScore) {
            highScore = Math.floor(player.score);
            localStorage.setItem('nhr_highscore', highScore);
            highScoreVal.textContent = highScore;
        }

        finalScore.textContent = Math.floor(player.score);
        finalCoins.textContent = player.coins;
        
        gameHUD.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
    }

    function updateHUD() {
        scoreVal.textContent = Math.floor(player.score);
        coinsVal.textContent = player.coins;
        speedVal.textContent = Math.floor(player.speed);
        nitroBar.style.width = `${(player.nitro / maxNitro) * 100}%`;
    }

    function loop(time) {
        const dt = Math.min((time - lastTime) / 1000, 0.1); 
        lastTime = time;

        const shakes = update(dt);
        
        // Always render (even if game over or menu, to see the background)
        ThreeEngine.update(dt, player, traffic, items, shakes?.shakeX || 0, shakes?.shakeY || 0);

        requestAnimationFrame(loop);
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        mainMenu.classList.add('hidden');
        gameHUD.classList.remove('hidden');
        resetGame();
        state = 'playing';
        Audio.startEngine();
    });

    restartBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameHUD.classList.remove('hidden');
        resetGame();
        state = 'playing';
        Audio.startEngine();
    });

    // Initial background render
    ThreeEngine.initPlayer(playerColor);

    // Start loop
    requestAnimationFrame((t) => { lastTime = t; loop(t); });
});

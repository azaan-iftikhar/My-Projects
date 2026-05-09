// main.js - Entry point and main game loop
window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    // Initialize Game Architecture
    const game = new Game(canvas.width, canvas.height);
    // Inject the player instance
    game.player = new Player(game); 

    // DOM Elements for UI Updates
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const finalScoreElement = document.getElementById('final-score');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');

    // Enemy Spawning details
    let enemyTimer = 0;
    let enemyInterval = 1000; // Start out spawning an enemy every 1.0 seconds
    
    // Core Game Loop
    function animate(timeStamp) {
        // Calculate deltaTime to ensure consistent speed regardless of framerate
        if (!game.lastTime) game.lastTime = timeStamp; // Initialize on first frame
        const deltaTime = timeStamp - game.lastTime;
        game.lastTime = timeStamp;

        if (game.gameStarted && !game.gameOver) {
            // Spawn new enemies over time
            if (enemyTimer > enemyInterval) {
                game.enemies.push(new Enemy(game));
                enemyTimer = 0;
                // Slowly reduce interval to increase difficulty over time (floor at 300ms)
                if (enemyInterval > 300) enemyInterval -= 15; 
            } else {
                enemyTimer += deltaTime;
            }

            // Engine updates
            game.update(deltaTime);
            game.draw(ctx);

            // UI overlay updates
            scoreElement.innerText = game.score;
            livesElement.innerText = game.lives;

            // Trigger Game Over screen state
            if (game.gameOver) {
                finalScoreElement.innerText = game.score;
                gameOverScreen.classList.remove('hidden');
            }
        }

        // Handle Input for Start / Restarting Game
        if ((!game.gameStarted || game.gameOver) && game.input.isPressed(' ')) {
            if (!game.gameStarted) {
                startScreen.classList.add('hidden');
            } else if (game.gameOver) {
                gameOverScreen.classList.add('hidden');
            }
            
            // Reset core settings and state
            game.start();
            game.lastTime = performance.now();
            enemyTimer = 0;
            enemyInterval = 1000;
        }

        // Loop Request
        requestAnimationFrame(animate);
    }
    
    // Kickoff the loop
    animate(0);
});

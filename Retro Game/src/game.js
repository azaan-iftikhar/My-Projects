// game.js - Core game logic and state management
class Game {
    constructor(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.input = new InputHandler();
        
        // Game Entities
        this.bullets = [];
        this.enemies = [];
        this.player = null; // Will be assigned in main.js
        
        // Game State
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.gameStarted = false;
    }

    start() {
        this.gameStarted = true;
        this.gameOver = false;
        this.score = 0;
        this.lives = 3;
        this.bullets = [];
        this.enemies = [];
        
        // Reset player if it exists
        if (this.player) {
            this.player.reset();
        }
    }

    update(deltaTime) {
        if (!this.gameStarted || this.gameOver) return;

        // Update player
        if (this.player) {
            this.player.update(this.input, deltaTime, this);
        }

        // Update bullets
        this.bullets.forEach(bullet => bullet.update(deltaTime));
        // Filter out deleted bullets
        this.bullets = this.bullets.filter(bullet => !bullet.markedForDeletion);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime, this));
        // Filter out dead enemies
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    draw(context) {
        // Clear canvas
        context.clearRect(0, 0, this.width, this.height);

        // Draw player
        if (this.player && this.gameStarted) {
            this.player.draw(context);
        }
        
        // Draw bullets and enemies
        this.bullets.forEach(bullet => bullet.draw(context));
        this.enemies.forEach(enemy => enemy.draw(context));
    }
}

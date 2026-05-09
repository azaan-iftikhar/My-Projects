// enemy.js - Handles enemy movement, rendering, and collision detection
class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 40;
        // Spawn at a random horizontal position
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height; // Start slightly above the screen
        
        // Randomize speed
        this.speed = Math.random() * 2 + 2; 
        
        // Randomize enemy color between classic neon arcade colors
        const colors = ['#f00', '#ff0', '#0f0', '#f80']; // Red, Yellow, Green, Orange
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.markedForDeletion = false;
    }

    update(deltaTime, game) {
        // Move downwards
        this.y += this.speed;

        // Remove if it passes the bottom of the screen
        if (this.y > this.game.height) {
            this.markedForDeletion = true;
        }

        // Collision detection with player
        if (game.player && this.checkCollision(this, game.player)) {
            this.markedForDeletion = true;
            game.lives--; // Lose a life
            if (game.lives <= 0) {
                game.gameOver = true;
            }
        }

        // Collision detection with player's bullets
        game.bullets.forEach(bullet => {
            if (this.checkCollision(this, bullet)) {
                this.markedForDeletion = true; // Destroy enemy
                bullet.markedForDeletion = true; // Destroy bullet
                game.score += 10; // Increase score
            }
        });
    }

    draw(context) {
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.fillStyle = this.color;
        
        // Draw main enemy block
        context.fillRect(this.x, this.y, this.width, this.height);
        
        // Add a darker inner core for a more detailed retro look
        context.fillStyle = '#111';
        context.fillRect(this.x + 10, this.y + 10, this.width - 20, this.height - 20);
        
        context.shadowBlur = 0;
    }

    // Helper method: AABB (Axis-Aligned Bounding Box) Collision Detection
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
}

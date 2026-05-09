// bullet.js - Handles player projectiles
class Bullet {
    constructor(x, y) {
        this.width = 4;
        this.height = 15;
        // Center the bullet on the X coordinate provided
        this.x = x - this.width / 2;
        this.y = y;
        this.speed = 10;
        this.color = '#f0f'; // Neon pink for high contrast
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        // Move upward
        this.y -= this.speed;
        
        // Flag for deletion if it moves beyond the top of the canvas
        if (this.y < 0 - this.height) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        // Apply neon glow
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.fillStyle = this.color;
        
        // Draw the laser beam
        context.fillRect(this.x, this.y, this.width, this.height);
        
        // Reset shadow
        context.shadowBlur = 0;
    }
}

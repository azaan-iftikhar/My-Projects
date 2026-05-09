// player.js - Handles player logic, movement, and rendering
class Player {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - 20;
        // Movement speed
        this.speed = 5;
        this.color = '#0ff'; // Neon blue
        
        // Shooting cooldown to prevent spamming
        this.cooldown = 0;
    }

    // Reset player position when game restarts
    reset() {
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - 20;
        this.cooldown = 0;
    }

    update(input, deltaTime, game) {
        // Horizontal Movement
        if ((input.isPressed('ArrowLeft') || input.isPressed('a')) && this.x > 0) {
            this.x -= this.speed;
        }
        if ((input.isPressed('ArrowRight') || input.isPressed('d')) && this.x < this.game.width - this.width) {
            this.x += this.speed;
        }
        
        // Vertical Movement
        if ((input.isPressed('ArrowUp') || input.isPressed('w')) && this.y > 0) {
            this.y -= this.speed;
        }
        if ((input.isPressed('ArrowDown') || input.isPressed('s')) && this.y < this.game.height - this.height) {
            this.y += this.speed;
        }

        // Handle shooting cooldown
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
        }

        // Fire bullet
        if (input.isPressed(' ') && this.cooldown <= 0) {
            this.shoot(game);
        }
    }

    shoot(game) {
        // Ensure Bullet class is loaded, then fire
        if (typeof Bullet !== 'undefined') {
            // Spawn bullet at the center-top of the player ship
            game.bullets.push(new Bullet(this.x + this.width / 2, this.y));
            // 200 millisecond cooldown
            this.cooldown = 200; 
        }
    }

    draw(context) {
        // Apply neon glow effect
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.fillStyle = this.color;
        
        // Draw a classic retro spaceship shape (triangle with an indented bottom)
        context.beginPath();
        context.moveTo(this.x + this.width / 2, this.y); // Top point
        context.lineTo(this.x + this.width, this.y + this.height); // Bottom right
        context.lineTo(this.x + this.width / 2, this.y + this.height - 10); // Bottom middle indent
        context.lineTo(this.x, this.y + this.height); // Bottom left
        context.closePath();
        
        context.fill();
        
        // Reset shadow so it doesn't affect other elements
        context.shadowBlur = 0;
    }
}

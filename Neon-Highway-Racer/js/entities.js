// entities.js - Rendering logic for cars, coins, and scenery

const Entities = (function() {
    
    function drawCar(ctx, x, y, scale, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        
        // Very simple geometric vector car
        
        // Tires (Back)
        ctx.fillStyle = '#111';
        ctx.fillRect(-60, -10, 20, 20);
        ctx.fillRect(40, -10, 20, 20);
        
        // Shadow/Underbody
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(-50, -5, 100, 15);
        
        // Body
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-45, -20);
        ctx.lineTo(45, -20);
        ctx.lineTo(50, 0);
        ctx.lineTo(-50, 0);
        ctx.fill();
        
        // Roof
        ctx.fillStyle = '#111'; // windshield
        ctx.beginPath();
        ctx.moveTo(-35, -45);
        ctx.lineTo(35, -45);
        ctx.lineTo(40, -20);
        ctx.lineTo(-40, -20);
        ctx.fill();
        
        // Roof top color
        ctx.fillStyle = color;
        ctx.fillRect(-30, -50, 60, 5);
        
        // Taillights
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-45, -15, 15, 5);
        ctx.fillRect(30, -15, 15, 5);

        // License plate area
        ctx.fillStyle = '#fff';
        ctx.fillRect(-10, -10, 20, 5);
        
        ctx.restore();
    }

    function drawCoin(ctx, x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        
        ctx.beginPath();
        ctx.arc(0, -30, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#ffdd00';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, -30);
        
        ctx.restore();
    }

    function drawTree(ctx, x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        
        // Trunk
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(-5, -40, 10, 40);
        
        // Leaves
        ctx.fillStyle = '#00ff66';
        ctx.beginPath();
        ctx.moveTo(0, -120);
        ctx.lineTo(-30, -40);
        ctx.lineTo(30, -40);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.lineTo(-40, -10);
        ctx.lineTo(40, -10);
        ctx.fill();

        ctx.restore();
    }

    return {
        drawCar,
        drawCoin,
        drawTree
    };
})();

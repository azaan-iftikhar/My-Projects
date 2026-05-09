// renderer.js - Handles the pseudo-3D projection and canvas drawing

const Renderer = (function() {
    let canvas, ctx;
    let width, height;
    
    // Camera properties
    const cameraHeight = 1000;
    const cameraDepth = 1; // FOV calculation simplified
    const drawDistance = 300;
    const segmentLength = 200;
    const roadWidth = 2000; // Total width of road
    const lanes = 4;
    
    // Colors
    const COLORS = {
        sky: '#050510',
        tree: '#004400',
        light: '#fff',
        dark: { road: '#222', grass: '#051105', rumble: '#555', lane: '#222' },
        lightTheme: { road: '#333', grass: '#071807', rumble: '#fff', lane: '#fff' }
    };

    let segments = [];
    let trackLength = 0;

    function init(c) {
        canvas = c;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        resetRoad();
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function resetRoad() {
        segments = [];
        for (let n = 0; n < 500; n++) {
            segments.push({
                index: n,
                p1: { world: { x: 0, y: 0, z: n * segmentLength }, camera: {}, screen: {} },
                p2: { world: { x: 0, y: 0, z: (n + 1) * segmentLength }, camera: {}, screen: {} },
                color: Math.floor(n / 3) % 2 ? COLORS.dark : COLORS.lightTheme,
                curve: 0, // Keep straight for endless highway or add curves later
                cars: [],
                sprites: []
            });
        }
        trackLength = segments.length * segmentLength;
    }

    function findSegment(z) {
        return segments[Math.floor(z / segmentLength) % segments.length];
    }

    function project(p, cameraX, cameraY, cameraZ) {
        p.camera.x = (p.world.x || 0) - cameraX;
        p.camera.y = (p.world.y || 0) - cameraY;
        p.camera.z = (p.world.z || 0) - cameraZ;
        
        const scale = cameraDepth / p.camera.z;
        p.screen.scale = scale;
        p.screen.w = Math.round((width / 2) * scale * roadWidth);
        p.screen.x = Math.round((width / 2) + (scale * p.camera.x * width / 2));
        p.screen.y = Math.round((height / 2) - (scale * p.camera.y * height / 2));
    }

    function drawPolygon(x1, y1, w1, x2, y2, w2, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1 - w1, y1);
        ctx.lineTo(x2 - w2, y2);
        ctx.lineTo(x2 + w2, y2);
        ctx.lineTo(x1 + w1, y1);
        ctx.fill();
    }

    function renderBackground() {
        // Simple dark sky with a subtle gradient
        const grad = ctx.createLinearGradient(0, 0, 0, height/2);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, '#1a0b2e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height/2);
    }

    function render(camera, player) {
        ctx.clearRect(0, 0, width, height);
        renderBackground();

        const baseSegment = findSegment(camera.z);
        let maxy = height;

        let x = 0, dx = 0;

        for (let n = 0; n < drawDistance; n++) {
            const segment = segments[(baseSegment.index + n) % segments.length];
            
            segment.looped = segment.index < baseSegment.index;
            const loopZ = segment.looped ? trackLength : 0;

            project(segment.p1, camera.x - x, camera.y + cameraHeight, camera.z - loopZ);
            project(segment.p2, camera.x - x - dx, camera.y + cameraHeight, camera.z - loopZ);

            x = x + dx;
            dx = dx + segment.curve;

            // Don't draw if behind camera or covered by previous segment
            if (segment.p1.camera.z <= cameraDepth || segment.p2.screen.y >= maxy) {
                continue;
            }

            maxy = segment.p1.screen.y;

            // Draw Grass
            drawPolygon(
                width/2, segment.p1.screen.y, width,
                width/2, segment.p2.screen.y, width,
                segment.color.grass
            );

            // Draw Rumble strips
            const rumbleWidth1 = segment.p1.screen.w * 1.1;
            const rumbleWidth2 = segment.p2.screen.w * 1.1;
            drawPolygon(
                segment.p1.screen.x, segment.p1.screen.y, rumbleWidth1,
                segment.p2.screen.x, segment.p2.screen.y, rumbleWidth2,
                segment.color.rumble
            );

            // Draw Road
            drawPolygon(
                segment.p1.screen.x, segment.p1.screen.y, segment.p1.screen.w,
                segment.p2.screen.x, segment.p2.screen.y, segment.p2.screen.w,
                segment.color.road
            );

            // Draw Lanes
            if (segment.color.lane) {
                const laneW1 = segment.p1.screen.w * 0.02;
                const laneW2 = segment.p2.screen.w * 0.02;
                for (let l = 1; l < lanes; l++) {
                    const laneX1 = segment.p1.screen.x - segment.p1.screen.w + (l * 2 * segment.p1.screen.w / lanes);
                    const laneX2 = segment.p2.screen.x - segment.p2.screen.w + (l * 2 * segment.p2.screen.w / lanes);
                    drawPolygon(
                        laneX1, segment.p1.screen.y, laneW1,
                        laneX2, segment.p2.screen.y, laneW2,
                        segment.color.lane
                    );
                }
            }
        }
    }

    return {
        init,
        resetRoad,
        findSegment,
        render,
        get trackLength() { return trackLength; },
        get segmentLength() { return segmentLength; },
        get roadWidth() { return roadWidth; },
        get lanes() { return lanes; }
    };
})();

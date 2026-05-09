// input.js - Handles keyboard and mobile inputs

const Input = (function() {
    let keys = {
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
        w: false, a: false, s: false, d: false,
        " ": false // space
    };

    let touchX = null;
    let isTouching = false;
    let tiltX = 0;

    function init() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (keys.hasOwnProperty(e.key) || e.key === " ") {
                keys[e.key] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (keys.hasOwnProperty(e.key) || e.key === " ") {
                keys[e.key] = false;
            }
        });

        // Touch
        window.addEventListener('touchstart', (e) => {
            isTouching = true;
            touchX = e.touches[0].clientX;
        });

        window.addEventListener('touchmove', (e) => {
            touchX = e.touches[0].clientX;
        });

        window.addEventListener('touchend', () => {
            isTouching = false;
            touchX = null;
        });

        // Tilt (Device Orientation)
        window.addEventListener('deviceorientation', (e) => {
            // e.gamma is left-to-right tilt in degrees, where right is positive
            if (e.gamma !== null) {
                tiltX = e.gamma; 
            }
        });
    }

    function isAccelerating() {
        return keys.ArrowUp || keys.w || isTouching; // Manual acceleration
    }

    function isBraking() {
        return keys.ArrowDown || keys.s;
    }

    function getSteering() {
        let steer = 0;
        if (keys.ArrowLeft || keys.a) steer -= 1;
        if (keys.ArrowRight || keys.d) steer += 1;

        if (isTouching && touchX !== null) {
            const halfW = window.innerWidth / 2;
            if (touchX < halfW) steer -= 1;
            else steer += 1;
        }

        // Tilt steering mapping (-30 to +30 degrees)
        if (Math.abs(tiltX) > 5) {
            steer += Math.max(-1, Math.min(1, tiltX / 30));
        }

        return Math.max(-1, Math.min(1, steer));
    }

    function isNitro() {
        return keys[" "];
    }

    return {
        init,
        isAccelerating,
        isBraking,
        getSteering,
        isNitro
    };
})();

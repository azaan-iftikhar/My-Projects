// input.js - Manages keyboard state
class InputHandler {
    constructor() {
        // Track the state of relevant keys
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            w: false,
            a: false,
            s: false,
            d: false,
            ' ': false // Spacebar
        };

        // When a key is pressed down, set its state to true
        window.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = true;
            }
        });

        // When a key is released, set its state to false
        window.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
            }
        });
    }

    // Utility function to check if a specific key is pressed
    isPressed(key) {
        return this.keys[key];
    }
}

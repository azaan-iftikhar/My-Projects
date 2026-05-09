// audio.js - Synthesized Web Audio sounds

const Audio = (function() {
    let audioCtx;
    let engineOsc, engineGain;
    
    function init() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function startEngine() {
        if (!audioCtx) init();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        if (!engineOsc) {
            engineOsc = audioCtx.createOscillator();
            engineOsc.type = 'sawtooth';
            engineOsc.frequency.setValueAtTime(50, audioCtx.currentTime);
            
            engineGain = audioCtx.createGain();
            engineGain.gain.setValueAtTime(0, audioCtx.currentTime);
            
            // Simple lowpass filter to make it hum rather than buzz
            let filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            
            engineOsc.connect(filter);
            filter.connect(engineGain);
            engineGain.connect(audioCtx.destination);
            
            engineOsc.start();
        }
    }

    function updateEngine(speedRatio) {
        if (!engineOsc || !engineGain) return;
        
        // Pitch goes from 50Hz to 150Hz based on speed
        const freq = 50 + (speedRatio * 100);
        engineOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
        
        // Volume
        const vol = 0.1 + (speedRatio * 0.1);
        engineGain.gain.setTargetAtTime(vol, audioCtx.currentTime, 0.1);
    }

    function stopEngine() {
        if (engineGain) {
            engineGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        }
    }

    function playSound(type) {
        if (!audioCtx) init();
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;

        if (type === 'coin') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'crash') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(10, now + 0.5);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type === 'nitro') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 1.0);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
            osc.start(now);
            osc.stop(now + 1.0);
        } else if (type === 'nearmiss') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.linearRampToValueAtTime(600, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    }

    return {
        init,
        startEngine,
        updateEngine,
        stopEngine,
        playSound
    };
})();

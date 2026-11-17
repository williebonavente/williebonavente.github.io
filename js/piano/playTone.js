let audioCtx = null;
const activeRibbons = new Map();
const finishedRibbons =  [];
const particles = [];
const shockwaves = [];

function playTone(freq) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);

    const osc1 = audioCtx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    const osc2 = audioCtx.createOscillator();
    const overtoneGain = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    overtoneGain.gain.setValueAtTime(0.08, now);

    osc1.connect(masterGain);
    osc2.connect(overtoneGain);
    overtoneGain.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.85);
    osc2.stop(now + 1.85);

}
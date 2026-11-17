let animationFrameId = null;
let isPianoRunningLoop = false;

function mountPiano() {
    const keysContainer = document.getElementById('piano-keys');
    const canvas = document.getElementById('piano-canvas');

    if (!keysContainer || !canvas) return;

    unmountPiano();

    keysContainer.innerHTML = "";
    buildPianoKeys();

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    startVisualizerLoop();


    const demoBtn = document.getElementById('demo-song-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', playRiverFlowsInYou);
    }
}

function unmountPiano() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (typeof stopDemo == "function") {
        stopDemo();
    }

    activeRibbons.clear();
    finishedRibbons.length = 0;
    particles.length = 0;
    shockwaves.length = 0;
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        const dialog = document.getElementById('portfolio-modal');
        const isPianoModalOpen = dialog && dialog.open && dialog.getAttribute('data-active-dialog') === 'piano';

        if (!isPianoModalOpen || e.repeat) return;

        const item = PIANO_NOTES.find(n => n.key === e.key.toLowerCase());
        if (item) {
            e.preventDefault();
            triggerNoteOn(item);
        }
    });

    document.addEventListener('keyup', (e) => {
        PIANO_NOTES.forEach(n => {
            if (n.key === e.key || n.key.toLowerCase() === e.key.toLowerCase()) {
                triggerNoteOff(n.note);
            }
        });
    });
});
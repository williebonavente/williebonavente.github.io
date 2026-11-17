let demoTimeouts = [];
let isPlayingDemo = false;


function stopDemo() {
    demoTimeouts.forEach(id => clearTimeout(id));
    demoTimeouts = [];
    isPlayingDemo = false;

    PIANO_NOTES.forEach(n => triggerNoteOff(n.note));

    const demoBtn = document.getElementById('demo-song-btn');
    if (demoBtn) demoBtn.textContent = '▶ River Flows in You';
}
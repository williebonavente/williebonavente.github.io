function buildPianoKeys() {
    const container = document.getElementById('piano-keys');
    if (!container) return;

    const whiteCount = PIANO_NOTES.filter(n => n.type === 'white').length;
    const whiteWidthPct = 100 / whiteCount;
    const blackWidthPct = whiteWidthPct * 0.62;

    PIANO_NOTES.forEach(item => {
        const keyEl = document.createElement('div');
        keyEl.dataset.note = item.note;
        keyEl.textContent = item.key;

        if (item.type === 'white') {
            keyEl.className = 'key-white';
        } else {
            keyEl.className = 'key-black';
            keyEl.style.width = `${blackWidthPct}%`;
            keyEl.style.left = `${(item.offset * whiteWidthPct) - (blackWidthPct / 2)}%`;
        }

        keyEl.addEventListener('mousedown', () => triggerNoteOn(item));
        keyEl.addEventListener('mouseup', () => triggerNoteOff(item.note));
        keyEl.addEventListener('mouseleave', () => triggerNoteOff(item.note));

        container.appendChild(keyEl);
    });
}

function triggerNoteOn(item) {
    if (activeRibbons.has(item.note)) return;

    const keyEl = document.querySelector(`[data-note="${item.note}"]`);
    const canvas = document.getElementById('piano-canvas');

    if (!keyEl || !canvas) return;


    const keyRect = keyEl.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    if (canvas.width != Math.round(canvasRect.width) || canvas.height !== Math.round(canvasRect.height)) {
        canvas.width = Math.round(canvasRect.width);
        canvas.height = Math.round(canvasRect.height);
    }


    keyEl.classList.add('active');
    playTone(item.freq);

    const x = (keyRect.left - canvasRect.left) + (keyRect.width / 2);
    const width = item.type == 'white' ? keyRect.width * 0.65 : keyRect.width * 0.85;

    activeRibbons.set(item.note, {
        x: x,
        y: canvas.height,
        width: width,
        height: 4,
        alpha: 1,
        color: getThemeAccent()
    });

    shockwaves.push({
        x: x,
        y: canvas.height - 2,
        radius: 4,
        maxRadius: 65,
        alpha: 0.9,
        color: getThemeAccent()
    });

    for (let i = 0; i < 18; i++) {
        particles.push({
            x: x + (Math.random() - 0.5) * width,
            y: canvas.height - 4,
            vx: (Math.random() - 0.5) * 4.5,
            vy: -(Math.random() * 6 + 2.5),
            gravity: 0.22,
            size: Math.random() * 3 + 1.5,
            alpha: 1,
            color: getThemeAccent(),
        });
    }
}

function triggerNoteOff(noteName) {
    const keyEl = document.querySelector(`[data-note="${noteName}"]`);
    if (keyEl) keyEl.classList.remove('active');

    if (activeRibbons.has(noteName)) {
        const ribbon = activeRibbons.get(noteName);
        ribbon.isReleasing = true;
        finishedRibbons.push(activeRibbons.get(noteName));
        activeRibbons.delete(noteName);
    }
} 
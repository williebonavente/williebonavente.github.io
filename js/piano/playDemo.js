function playRiverFlowsInYou() {
    if (isPlayingDemo) {
        stopDemo();
        return;
    }

    isPlayingDemo = true;
    const demoBtn = document.getElementById('demo-song-btn');
    if (demoBtn) demoBtn.textContent = '■ Stop Demo';

    // { note, time (ms), dur (ms) } — Original Key of A Major
    const melody = [
        // Signature opening trill motif: A4 - G#4 - A4 - G#4 - A4 - E4 - A4 - D4
        { note: 'A4',  time: 0,    dur: 280 },
        { note: 'G#4', time: 300,  dur: 280 },
        { note: 'A4',  time: 600,  dur: 280 },
        { note: 'G#4', time: 900,  dur: 280 },
        { note: 'A4',  time: 1200, dur: 280 },
        { note: 'E4',  time: 1500, dur: 280 },
        { note: 'A4',  time: 1800, dur: 280 },
        { note: 'D4',  time: 2100, dur: 750 },

        // Gentle ascending turnaround: A3 - C#4 - E4 - A4 - G#4
        { note: 'A3',  time: 2950, dur: 240 },
        { note: 'C#4', time: 3200, dur: 240 },
        { note: 'E4',  time: 3450, dur: 240 },
        { note: 'A4',  time: 3700, dur: 520 },
        { note: 'G#4', time: 4250, dur: 650 },

        // Second phrase: E4 - A4 - B4 - C#5 - D5 - E5 - D5 - C#5 - B4
        { note: 'E4',  time: 5000, dur: 250 },
        { note: 'A4',  time: 5270, dur: 250 },
        { note: 'B4',  time: 5540, dur: 250 },
        { note: 'C#5', time: 5810, dur: 480 },
        { note: 'D5',  time: 6320, dur: 260 },
        { note: 'E5',  time: 6600, dur: 260 },
        { note: 'D5',  time: 6880, dur: 260 },
        { note: 'C#5', time: 7160, dur: 260 },
        { note: 'B4',  time: 7440, dur: 820 },

        // Iconic cascading 16th-note waterfall run: A4 - G#4 - A4 ...
        { note: 'A4',  time: 8350,  dur: 170 },
        { note: 'G#4', time: 8530,  dur: 170 },
        { note: 'A4',  time: 8710,  dur: 170 },
        { note: 'A3',  time: 8890,  dur: 170 },
        { note: 'A4',  time: 9070,  dur: 170 },
        { note: 'G#4', time: 9250,  dur: 170 },
        { note: 'A4',  time: 9430,  dur: 170 },
        { note: 'B3',  time: 9610,  dur: 170 },

        { note: 'A4',  time: 9790,  dur: 170 },
        { note: 'G#4', time: 9970,  dur: 170 },
        { note: 'A4',  time: 10150, dur: 170 },
        { note: 'E4',  time: 10330, dur: 170 },
        { note: 'A4',  time: 10510, dur: 170 },
        { note: 'D4',  time: 10690, dur: 850 },

        // Final resolving chord arpeggio: A3 - E4 - A4 - C#5
        { note: 'A3',  time: 11650, dur: 1100 },
        { note: 'E4',  time: 11800, dur: 950 },
        { note: 'A4',  time: 11950, dur: 800 },
        { note: 'C#5', time: 12100, dur: 900 }
    ];

    melody.forEach(step => {
        const item = PIANO_NOTES.find(n => n.note === step.note);
        if (!item) return;

        const onId = setTimeout(() => {
            triggerNoteOn(item);
            const offId = setTimeout(() => triggerNoteOff(item.note), step.dur);
            demoTimeouts.push(offId);
        }, step.time);

        demoTimeouts.push(onId);
    });

    // Reset button label once finished
    const endId = setTimeout(stopDemo, 13200);
    demoTimeouts.push(endId);
}
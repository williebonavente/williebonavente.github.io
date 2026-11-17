const DIALOGS_DATA = {
    "dialog-about": {
        title: "01. About Me",
        body: `
            <p>I am a BS Information Technology graduate from the Polytechnic University of the Philippines (PUP Sta. Mesa). My work sits at the intersection of full-stack web engineering, information management, and applied AI.</p>
            <p>Whether architecting database schemas, evaluating UI/UX heuristics with large language models, or digitizing archives with 3D and OCR pipelines, I enjoy turning complex requirements into fast, reliable software.</p>
        `
    },
    "dialog-certs": {
        title: "02. List of Certifications",
        body: `
            <ul class="cert-list">
                <li>
                    <strong>Computer Systems Servicing NC II</strong>
                    <span>TESDA — 2024</span>
                </li>
                <li>
                    <strong>Digital Productivity Essentials Series</strong>
                    <span>Department of Information and Communications Technology (DICT) — 2026</span>
                </li>
            </ul>
        `
    },
    "dialog-skills": {
        title: "03. Tech Stack",
        body: `
            <div class="skills-grid">
                <div class="skill-group">
                    <h4>Frontend</h4>
                    <p>HTML5, CSS3, JavaScript (ES6+), React, Tailwind CSS, Bootstrap</p>
                </div>
                <div class="skill-group">
                    <h4>Backend & Data</h4>
                    <p>Node.js, PHP, MySQL, Supabase, REST APIs</p>
                </div>
                <div class="skill-group">
                    <h4>Tools & Standards</h4>
                    <p>Git, GitHub, Linux, ISO/IEC Standards</p>
                </div>
            </div>
        `
    },
    piano: {
        title: 'Interactive Synth',
        subtitle: 'Use Keyboard (Z-;) or Click Keys • Switch themes anytime to change visualizer colors',
        body: `
            <div class="piano-modal-body">
                <div class="piano-controls" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <button type="button" id="demo-song-btn" class="piano-btn">▶ River Flows in You</button>
                    <span class="piano-hint">Keys: Z-C (Low) • A-; (Main)</span>
                </div>
                <div class="piano-wrapper">
                    <canvas id="piano-canvas"></canvas>
                    <div id="piano-keys" class="piano-keys"></div>
                </div>
            </div>
        `
    }
};
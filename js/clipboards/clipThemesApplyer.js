function spawnCigarSmoke(x0, y0, cfg) {
    if (!x0 && !y0) {
        const activeEl = document.activeElement;
        if (activeEl && activeEl !== document.body) {
            const rect = activeEl.getBoundingClientRect();
            x0 = rect.left + rect.width / 2;
            y0 = rect.top;
        }
    }

    const smokeRand = (min, max) => Math.random() * (max - min) + min;
    const smokePick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const randFn = typeof rand === 'function' ? rand : smokeRand;
    const pickFn = typeof pick === 'function' ? pick : smokePick;
    const activeCfg = cfg || THEME_PARTICLE_CONFIGS['cigarette'];

    const draftBias = randFn(-12, 22);

    for (let i = 0; i < activeCfg.count; i++) {
        const el = document.createElement('div');
        el.className = 'theme-burst-particle is-smoke';

        const dx = draftBias + randFn(-activeCfg.spreadX / 2, activeCfg.spreadX / 2);
        const dy = randFn(activeCfg.riseY[0], activeCfg.riseY[1]);
        const sway = randFn(10, 22) * (i % 2 === 0 ? 1 : -1);
        const rot = randFn(-24, 24);
        const size = randFn(activeCfg.size[0], activeCfg.size[1]);
        const color = pickFn(activeCfg.colors);
        const duration = Math.round(randFn(2800, 3800));

        el.style.setProperty('--x0', `${x0}px`);
        el.style.setProperty('--y0', `${y0}px`);
        el.style.setProperty('--dx', `${dx.toFixed(1)}px`);
        el.style.setProperty('--dy', `${dy.toFixed(1)}px`);
        el.style.setProperty('--sway', `${sway.toFixed(1)}px`);
        el.style.setProperty('--rot', `${rot.toFixed(1)}deg`);
        el.style.setProperty('--particle-size', `${size.toFixed(1)}px`);
        el.style.setProperty('--particle-color', color);
        el.style.setProperty('--particle-duration', `${duration}ms`);
        el.style.animationDelay = `${i * 55}ms`; // Steady, silky stream

        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove(), { once: true });
    }
}

function spawnThemeParticles(originEl, event) {
    console.count('spawnThemeParticles called');
    console.trace('spawnThemeParticles trace');
    const activeTheme = document.documentElement.getAttribute('data-theme');
    if (!activeTheme || !originEl) return;

    if (activeTheme === 'cigar' || activeTheme === 'cigarette') {
        if (typeof spawnCigarSmoke === 'function') {
            const rect = originEl.getBoundingClientRect();
            const x0 = event?.clientX || rect.left + rect.width / 2;
            const y0 = event?.clientY || rect.top - 6;
            const cfg = THEME_PARTICLE_CONFIGS?.[activeTheme] || THEME_PARTICLE_CONFIGS?.cigar;
            spawnCigarSmoke(x0, y0, cfg);
        }
        return;
    }

    const config = THEME_PARTICLE_CONFIGS[activeTheme];
    if (!config || !Array.isArray(config.symbols) || config.symbols.length === 0) return;

    const rect = originEl.getBoundingClientRect();
    const baseX = event?.clientX || rect.left + rect.width / 2;
    const baseY = rect.top - 6;

    const [minRise, maxRise] = config.riseY || [160, 280];
    const [minSize, maxSize] = config.size || [18, 28];

    for (let i = 0; i < config.count; i++) {
        const particle = document.createElement('span');
        particle.className = 'theme-burst-particle';
        particle.textContent = config.symbols[i % config.symbols.length];

        const startOffsetX = (Math.random() - 0.5) * Math.min(rect.width * 0.7, 70);
        const driftX = (Math.random() - 0.5) * (config.spreadX * 1.6);
        const swayX = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 24);
        const riseY = Math.max(minRise, 160) + Math.random() * (Math.max(maxRise, 280) - Math.max(minRise, 160));
        const rotateDeg = (Math.random() - 0.5) * 40;
        const sizePx = Math.max(minSize, 18) + Math.round(Math.random() * (Math.max(maxSize, 28) - Math.max(minSize, 18)));
        const durationMs = 1600 + Math.round(Math.random() * 1000);

        particle.style.setProperty('--x0', `${(baseX + startOffsetX).toFixed(1)}px`);
        particle.style.setProperty('--y0', `${baseY.toFixed(1)}px`);
        particle.style.setProperty('--dx', `${driftX.toFixed(1)}px`);
        particle.style.setProperty('--sway', `${swayX.toFixed(1)}px`);
        particle.style.setProperty('--dy', `${riseY.toFixed(1)}px`);
        particle.style.setProperty('--rot', `${rotateDeg.toFixed(1)}deg`);
        particle.style.setProperty('--particle-size', `${sizePx}px`);
        particle.style.setProperty('--particle-color', config.colors[i % config.colors.length]);
        particle.style.setProperty('--particle-duration', `${durationMs}ms`);
        particle.style.animationDelay = `${i * 75}ms`;

        document.body.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove(), { once: true });
    }
}

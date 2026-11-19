document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-email-btn');
    const copyStatus = document.getElementById('copy-status');

    if (copyBtn && copyStatus) {
        let resetTimer = null;

        copyBtn.addEventListener('click', (e) => {
            const email = copyBtn.getAttribute('data-email');
            if (!email) return;

            navigator.clipboard.writeText(email).then(() => {
                const activeTheme =
                    document.documentElement.getAttribute('data-theme') ||
                    document.body.getAttribute('data-theme') ||
                    'cigar';
                
                console.log(activeTheme);

                const rect = copyBtn.getBoundingClientRect();
                const x0 = e.clientX || rect.left + rect.width / 2;
                const y0 = e.clientY || rect.top + rect.height / 2;

                if (activeTheme === 'cigarette') {
                    const cfg = THEME_PARTICLE_CONFIGS.cigarette;
                    spawnCigarSmoke(x0, y0, cfg);
                } else {
                    spawnThemeParticles(copyBtn, e, activeTheme);
                }

                copyStatus.textContent = 'Copied!';
                copyStatus.classList.add('copied');

                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => {
                    copyStatus.textContent = 'Copy';
                    copyStatus.classList.remove('copied');
                }, 2000);
            }).catch((err) => {
                console.error('Failed to copy email:', err);
            });
        });
    }

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 160) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
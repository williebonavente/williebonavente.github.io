document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-email-btn');
    const copyStatus = document.getElementById('copy-status');

    copyBtn.addEventListener('click', () => {
        const email = copyBtn.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
            copyStatus.textContent = 'Copied!';
            copyStatus.classList.add('copied');
            setTimeout(() => {
                copyStatus.textContent = 'Copy';
                copyStatus.classList.remove('copied');
            }, 2000);
        });
    });

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 160) {
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



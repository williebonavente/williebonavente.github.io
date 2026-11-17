function renderThemeOptions(selectElement) {
    if (!selectElement) return;

    selectElement.innerHTML = THEMES_DATA.map(theme => `
        <option value="${theme.id}">${theme.label}</option>
        `).join('');
}


function applyTheme(themeId) {
    const root = document.documentElement;
    const themeSelect = document.getElementById('theme-select');

    const isValidTheme = THEMES_DATA.some(t => t.id === themeId);
    const activeTheme = isValidTheme ? themeId : 'dark';

    if (activeTheme === 'dark') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', activeTheme);
    }

    localStorage.setItem('portfolio-theme', activeTheme);

    if (themeSelect) {
        themeSelect.value = activeTheme;
    }

    if (activeTheme === 'piano') {
        window.dispatchEvent(new Event('resize'));
    } else if (typeof stopDemo === 'function') {
        stopDemo();
    }
}

function initTheme() {
    const themeSelect = document.getElementById('theme-select');

    renderThemeOptions(themeSelect);
    
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-schema: light)').matches;
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
    
    applyTheme(initialTheme);

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', initTheme);
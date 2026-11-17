function getThemeAccent() {
    return getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() || '#38bdf8';
}
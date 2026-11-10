(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    let preference;
    let toggle;

    try {
        preference = localStorage.getItem('saanvika-theme');
    } catch {}

    function applyTheme() {
        const dark = preference === 'dark' || (preference !== 'light' && systemTheme.matches);
        root.dataset.theme = dark ? 'dark' : 'light';
        if (toggle) toggle.setAttribute('aria-pressed', String(dark));
    }

    applyTheme();
    systemTheme.addEventListener('change', applyTheme);

    document.addEventListener('DOMContentLoaded', () => {
        toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'theme-toggle';
        toggle.textContent = 'Dark mode';
        applyTheme();
        toggle.addEventListener('click', () => {
            preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('saanvika-theme', preference);
            } catch {}
            applyTheme();
        });
        document.body.append(toggle);
    });
})();

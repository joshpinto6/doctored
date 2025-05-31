document.getElementById('theme-toggle').addEventListener('click', (event) => {
    let newTheme = undefined;
    if (localStorage.theme === "dark") {
        localStorage.removeItem('theme')
    } else if (!localStorage.theme) {
        newTheme = 'light';
        localStorage.theme = 'light';
    } else {
        newTheme = 'dark';
        localStorage.theme = 'dark';
    }

    applyTheme(newTheme);
});

document.getElementById('theme-dropdown').addEventListener('change', (event) => {
    if (event.target.dataset.changed ) {
        event.target.dataset.changed = undefined;
        if (new Date(event.target.dataset.changed) - new Date() < 1000) {
            return;
        }
    }
    const selectedTheme = event.target.value;
    if (selectedTheme === 'light' || selectedTheme === 'dark') {
        localStorage.theme = selectedTheme;
    } else {
        selectedTheme = undefined;
        localStorage.removeItem('theme');
    }
    applyTheme(selectedTheme, true);
});

applyTheme();

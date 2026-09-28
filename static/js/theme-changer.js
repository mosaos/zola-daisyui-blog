document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('[data-theme]').forEach((element) => {
        element.addEventListener('click', () => {
            const theme = element.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
});

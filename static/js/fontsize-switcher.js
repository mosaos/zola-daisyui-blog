function setSiteFontSize(size) {
    const htmlEl = document.documentElement;

    htmlEl.classList.remove(
        'font-size-sm',
        'font-size-lg',
        'font-size-xl'
    );

    if (size !== 'normal') {
        htmlEl.classList.add('font-size-' + size);
        localStorage.setItem('site-font-size', size);
    } else {
        localStorage.removeItem('site-font-size');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedSize = localStorage.getItem('site-font-size');

    if (savedSize) {
        setSiteFontSize(savedSize);
    }

    document.querySelectorAll('[data-font-size]').forEach((element) => {
        element.addEventListener('click', () => {
            setSiteFontSize(element.dataset.fontSize);
        });
    });
});
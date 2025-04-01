document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.cookie-consent');
    const acceptButton = document.querySelector('.accept-cookies-btn');
    const rejectButton = document.querySelector('.reject-cookies-btn');

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        banner.style.display = 'none';
    }

    acceptButton.addEventListener('click', () => {
        banner.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => banner.style.display = 'none', 500);
        localStorage.setItem('cookiesAccepted', 'true');
    });

    rejectButton.addEventListener('click', () => {
        banner.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => banner.style.display = 'none', 500);
        localStorage.setItem('cookiesAccepted', 'false');
    });
});
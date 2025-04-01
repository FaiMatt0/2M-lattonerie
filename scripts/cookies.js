function acceptCookies() {
    const banner = document.querySelector('.cookies-consent');
    banner.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => banner.style.display = 'none', 500);
    localStorage.setItem('cookiesAccepted', 'true');
}

function rejectCookies() {
    const banner = document.querySelector('.cookies-consent');
    banner.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => banner.style.display = 'none', 500);
    localStorage.setItem('cookiesAccepted', 'false');
}
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    
    // Check if consent has already been given
    if (localStorage.getItem('cookieConsent') !== null) {
        // Instead of changing display style, add a class
        cookieConsent.classList.add('hidden');
    }
    
    // Handle accept button click
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.add('hidden');
    });
    
    // Handle reject button click
    rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.classList.add('hidden');
    });
});
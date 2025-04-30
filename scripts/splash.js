document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 2500); // 2.5 seconds total (2s animation + 0.5s fade out)
});
// Testo da visualizzare
const testo = "Questo è un semplice effetto macchina da scrivere.";
// Velocità della digitazione in millisecondi
const velocita = 100;

// Funzione per l'effetto macchina da scrivere
function effettoMacchinaDaScrivere(i = 0) {
    const elemento = document.getElementById("testo");
    if (elemento && i < testo.length) {
        elemento.textContent += testo.charAt(i);
        i++;
        setTimeout(() => effettoMacchinaDaScrivere(i), velocita);
    }
}

// Animation function for the about page text
function animateAboutText() {
    console.log('Running about text animation');
    
    // Get all paragraphs with the about-text-line class
    const textLines = document.querySelectorAll('.about-text-line');
    console.log('Found text lines:', textLines.length);
    
    if (textLines.length === 0) return;
    
    // First hide all paragraphs
    textLines.forEach(line => {
        line.style.opacity = '0';
        line.classList.remove('animate__animated', 'animate__fadeInUp');
    });
    
    // Then animate each paragraph with its specified delay
    textLines.forEach(line => {
        const delay = parseFloat(line.getAttribute('data-delay') || '0');
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.classList.add('animate__animated', 'animate__fadeInUp');
            console.log('Animating line with delay:', delay);
        }, delay * 1000);
    });
}

// Initialize the animation listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Typewriter script loaded');
    
    // For desktop version (index.html) using Swiper
    if (typeof Swiper !== 'undefined') {
        // Wait for swiper to initialize
        setTimeout(() => {
            const swiperEl = document.querySelector('.swiper');
            if (swiperEl && swiperEl.swiper) {
                console.log('Swiper detected, adding event listener');
                
                // Listen for slide changes
                swiperEl.swiper.on('slideChange', function() {
                    if (this.activeIndex === 1) { // About page is slide 1
                        console.log('Slide changed to about page');
                        animateAboutText();
                    }
                });
                
                // Check if we're already on the about page
                if (swiperEl.swiper.activeIndex === 1) {
                    console.log('Already on about page');
                    animateAboutText();
                }
            }
        }, 500);
    }
    
    // For mobile version using tabs or swiper
    const mobileNavLinks = document.querySelectorAll('.nav-link, .tab-button');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if this link leads to the about page
            const isAboutLink = this.textContent.includes('Chi siamo') || 
                               this.getAttribute('data-tab') === 'about' || 
                               this.getAttribute('href') === '#about';
            
            if (isAboutLink) {
                console.log('About link clicked');
                // Slight delay to ensure page transition
                setTimeout(animateAboutText, 300);
            }
        });
    });
    
    // For mobile swiper
    if (window.swiper) {
        console.log('Mobile swiper detected');
        window.swiper.on('slideChange', function() {
            // Assuming about page is slide index 1 in mobile too
            if (this.activeIndex === 1) {
                console.log('Mobile slide changed to about');
                animateAboutText();
            }
        });
        
        // Check if mobile is already on about page
        if (window.swiper.activeIndex === 1) {
            console.log('Mobile already on about');
            animateAboutText();
        }
    }
    
    // Also check URL hash for direct navigation to about section
    if (window.location.hash === '#about' || 
        window.location.hash === '#chi-siamo') {
        console.log('URL hash indicates about page');
        setTimeout(animateAboutText, 500);
    }
});

// Make animation accessible globally so it can be called from other scripts
window.runAboutAnimation = animateAboutText;
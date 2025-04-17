document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');
    
    // Open menu function
    function openMenu() {
        mobileNav.classList.add('open');
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        
        // Remove any existing animation classes and add the animation classes when menu opens
        navLogo.classList.remove('animate__animated', 'animate__zoomInDown');
        // Force a reflow to restart the animation
        void navLogo.offsetWidth;
        // Add animation classes
        navLogo.classList.add('animate__animated', 'animate__zoomInDown');
    }
    
    // Close menu function
    function closeNav() {
        mobileNav.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Event Listeners
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close the menu
            closeNav();
        });
    });
    
    // Update active nav link based on current hash
    function updateActiveNav() {
        const hash = window.location.hash || '#home';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Listen for hash changes to update active link
    window.addEventListener('hashchange', updateActiveNav);
    
    // Initial active link
    updateActiveNav();
    
    // Initially remove animation classes from logo
    navLogo.classList.remove('animate__animated', 'animate__zoomInDown');
    
    // Update the menu based on swiper's active slide
    if (typeof swiper !== 'undefined') {
        swiper.on('slideChange', function() {
            const hash = '#' + swiper.slides[swiper.activeIndex].getAttribute('data-hash');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }
});
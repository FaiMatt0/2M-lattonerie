/**
 * Heading Animations Script
 * Handles animations for section headings on both desktop and mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Heading animations script loaded');
    
    // Check if we're on desktop (has .mySwiper) or mobile (has .swiper-container)
    const isDesktop = document.querySelector('.mySwiper') !== null;
    const isMobile = document.querySelector('.swiper-container') !== null;
    
    if (isDesktop) {
        console.log('Desktop version detected');
        initDesktopAnimations();
    }
    
    if (isMobile) {
        console.log('Mobile version detected');
        initMobileAnimations();
    }
    
    /**
     * Desktop animation initialization
     */
    function initDesktopAnimations() {
        // Target all heading elements that should be animated
        const headings = document.querySelectorAll('.heading.animate__animated, .heading.section-title');
        console.log('Found desktop headings:', headings.length);
        
        if (headings.length === 0) return;
        
        // Wait for Swiper to be initialized
        setTimeout(function() {
            // Get Swiper instance
            const swiperEl = document.querySelector('.mySwiper');
            const swiper = swiperEl && swiperEl.swiper ? swiperEl.swiper : null;
            
            if (!swiper) {
                console.log('Desktop Swiper not found, trying to initialize manually');
                setupDesktopAnimationsWithoutSwiper(headings);
                return;
            }
            
            console.log('Desktop Swiper found, setting up animations');
            
            // Function to animate the current slide's heading
            function animateCurrentHeading() {
                // Get active index (skip the first slide which is home)
                const activeIndex = swiper.activeIndex;
                console.log('Current slide index:', activeIndex);
                
                // Reset all animations first
                headings.forEach(heading => {
                    heading.classList.remove('animate__backInRight');
                });
                
                // Find the current heading (skip the home slide which is at index 0)
                if (activeIndex > 0 && activeIndex <= headings.length) {
                    const currentHeading = headings[activeIndex - 1];
                    if (currentHeading) {
                        console.log('Animating heading:', currentHeading.textContent);
                        // Force reflow to restart animation
                        void currentHeading.offsetWidth;
                        // Add animation class
                        currentHeading.classList.add('animate__backInRight');
                    }
                }
            }
            
            // Set up slide change event
            swiper.on('slideChange', function() {
                console.log('Slide changed');
                // Small delay to ensure DOM is updated
                setTimeout(animateCurrentHeading, 50);
            });
            
            // Handle navigation clicks
            document.querySelectorAll('.Links li').forEach(function(link, index) {
                link.addEventListener('click', function() {
                    console.log('Navigation clicked:', index);
                    // Small delay to ensure slide change completes
                    setTimeout(animateCurrentHeading, 100);
                });
            });
            
            // Trigger initial animation
            animateCurrentHeading();
        }, 500);
    }
    
    /**
     * Fallback for desktop without Swiper
     */
    function setupDesktopAnimationsWithoutSwiper(headings) {
        // Add click handlers to navigation items
        document.querySelectorAll('.Links li').forEach(function(link, index) {
            link.addEventListener('click', function() {
                console.log('Navigation clicked (fallback):', index);
                
                // Reset all animations
                headings.forEach(heading => {
                    heading.classList.remove('animate__backInRight');
                });
                
                // Skip home slide at index 0
                if (index > 0 && index <= headings.length) {
                    const currentHeading = headings[index - 1];
                    if (currentHeading) {
                        console.log('Animating heading (fallback):', currentHeading.textContent);
                        // Force reflow
                        void currentHeading.offsetWidth;
                        // Add animation
                        currentHeading.classList.add('animate__backInRight');
                    }
                }
            });
        });
        
        // Add mouse wheel handler for slide navigation
        document.addEventListener('wheel', function(e) {
            // Determine direction
            const direction = e.deltaY > 0 ? 1 : -1;
            
            // Find which section is currently visible
            const sections = document.querySelectorAll('.swiper-slide');
            let visibleSectionIndex = 0;
            
            for (let i = 0; i < sections.length; i++) {
                const rect = sections[i].getBoundingClientRect();
                // If section is at least 50% visible
                if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                    visibleSectionIndex = i;
                    break;
                }
            }
            
            // Calculate target section
            const targetIndex = Math.max(0, Math.min(sections.length - 1, visibleSectionIndex + direction));
            
            // Skip home slide at index 0
            if (targetIndex > 0 && targetIndex <= headings.length) {
                // Reset all animations
                headings.forEach(heading => {
                    heading.classList.remove('animate__backInRight');
                });
                
                const targetHeading = headings[targetIndex - 1];
                if (targetHeading) {
                    // Force reflow
                    void targetHeading.offsetWidth;
                    // Add animation
                    targetHeading.classList.add('animate__backInRight');
                }
            }
        }, { passive: true });
    }
    
    /**
     * Mobile animation initialization
     */
    function initMobileAnimations() {
        // Find all mobile headings
        const mobileHeadings = document.querySelectorAll('.swiper-slide .section-title.animate__animated');
        console.log('Found mobile headings:', mobileHeadings.length);
        
        if (mobileHeadings.length === 0) return;
        
        // Wait for Swiper to initialize
        setTimeout(function() {
            const mobileSwiper = 
                document.querySelector('.swiper-container')?.swiper || 
                window.mySwiper || 
                null;
                
            if (!mobileSwiper) {
                console.log('Mobile Swiper not found');
                return;
            }
            
            console.log('Mobile Swiper found, setting up animations');
            
            // Function to animate current heading
            function animateMobileHeading() {
                // Reset all animations
                mobileHeadings.forEach(heading => {
                    heading.classList.remove('animate__backInRight');
                });
                
                // Get current slide
                const activeSlide = mobileSwiper.slides[mobileSwiper.activeIndex];
                if (!activeSlide) return;
                
                // Find heading in active slide
                const activeHeading = activeSlide.querySelector('.section-title.animate__animated');
                if (activeHeading) {
                    console.log('Animating mobile heading:', activeHeading.textContent);
                    // Force reflow
                    void activeHeading.offsetWidth;
                    // Add animation
                    activeHeading.classList.add('animate__backInRight');
                }
            }
            
            // Set up slide change event
            mobileSwiper.on('slideChange', function() {
                setTimeout(animateMobileHeading, 50);
            });
            
            // Initial animation
            animateMobileHeading();
            
            // Handle hash changes
            window.addEventListener('hashchange', function() {
                setTimeout(animateMobileHeading, 100);
            });
        }, 500);
    }
});

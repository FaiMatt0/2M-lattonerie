document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const introVideo = document.getElementById('intro-video');
    let videoPlayed = false;
    let animationsInitialized = false;
    
    // Video is ready to play
    introVideo.addEventListener('canplay', function() {
        console.log("Video can play");
        introVideo.play()
            .then(() => {
                videoPlayed = true;
                console.log("Video playback started successfully");
            })
            .catch(error => {
                console.log("Video autoplay failed:", error);
                hideSplashScreen();
            });
    });
    
    // When video ends, hide splash screen
    introVideo.addEventListener('ended', function() {
        console.log("Video playback ended");
        hideSplashScreen();
    });
    
    // Fallback in case video doesn't play or load
    setTimeout(function() {
        if (!videoPlayed) {
            console.log("Video did not play within timeout period");
            hideSplashScreen();
        }
    }, 4000); // Wait 4 seconds for video to load and play
    
    // Handle video errors
    introVideo.addEventListener('error', function() {
        console.log("Video error occurred");
        hideSplashScreen();
    });
    
    // Start animations before video ends
    introVideo.addEventListener('timeupdate', function() {
        // If video is near the end (last 500ms) and animations haven't been initialized
        if (introVideo.duration - introVideo.currentTime < 0.5 && !animationsInitialized) {
            console.log("Video is nearly complete, initializing animations");
            initializeAnimations();
            animationsInitialized = true;
        }
    });
    
    function hideSplashScreen() {
        // Only initialize animations if they haven't been initialized yet
        if (!animationsInitialized) {
            initializeAnimations();
            animationsInitialized = true;
        }
        
        // Start fade out
        splashScreen.style.opacity = '0';
        
        // Only hide the element after transition completes
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 500); // Transition time
    }
    
    function initializeAnimations() {
        console.log("Initializing animations");
        const animatedElements = document.querySelectorAll('[data-animation-class]');
        
        animatedElements.forEach(element => {
            const animationClass = element.getAttribute('data-animation-class');
            if (animationClass) {
                // Reset the element's class to remove any animation
                element.className = '';
                
                // Force a reflow to ensure animation plays
                void element.offsetWidth;
                
                // Add the animation class
                element.className = animationClass;
                
                console.log(`Applied animation class: ${animationClass} to:`, element);
            }
        });
        
        // Trigger any additional animations or scripts if needed
        if (typeof animateHeadings === 'function') {
            animateHeadings();
        }
    }
});
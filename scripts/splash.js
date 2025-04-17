document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const introVideo = document.getElementById('intro-video');
    let videoPlayed = false;
    
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
    
    function hideSplashScreen() {
        splashScreen.style.opacity = '0';
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 500); // Transition time
    }
});
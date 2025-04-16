document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById("splash-screen");
    const introVideo = document.getElementById("intro-video");
    const homeElements = document.querySelectorAll("[data-animation-class]");

    // Store original animation classes and remove them initially to prevent auto-animation
    homeElements.forEach(element => {
        if (!element.getAttribute("data-animation-class")) {
            // Save original animation classes if not already saved
            const animationClasses = [];
            if (element.classList.contains("animate__animated")) animationClasses.push("animate__animated");
            if (element.classList.contains("animate__flipInY")) animationClasses.push("animate__flipInY");
            if (element.classList.contains("animate__backInLeft")) animationClasses.push("animate__backInLeft");
            if (element.classList.contains("animate__backInDown")) animationClasses.push("animate__backInDown");
            if (element.classList.contains("animate__backInUp")) animationClasses.push("animate__backInUp");
            if (element.classList.contains("animate__zoomInDown")) animationClasses.push("animate__zoomInDown");
            
            element.setAttribute("data-animation-class", animationClasses.join(" "));
        }
        
        // Remove animation classes only (preserve other classes)
        element.classList.remove("animate__animated");
        element.classList.remove("animate__flipInY");
        element.classList.remove("animate__backInLeft");
        element.classList.remove("animate__backInDown");
        element.classList.remove("animate__backInUp");
        element.classList.remove("animate__zoomInDown");
    });

    // Function to start animations
    function startHomeAnimations() {
        // Start animations immediately before splash screen fully disappears
        // This creates a smoother transition effect
        homeElements.forEach(element => {
            const animationClasses = element.getAttribute("data-animation-class").split(" ");
            // Add back only the animation classes
            animationClasses.forEach(cls => {
                if (cls) element.classList.add(cls);
            });
        });
    }

    // When video ends, hide splash screen and start animations
    introVideo.addEventListener("ended", function() {
        // Start animations first
        startHomeAnimations();
        
        // Then begin fading out the splash screen
        setTimeout(() => {
            splashScreen.style.opacity = "0";
            setTimeout(() => {
                splashScreen.style.display = "none";
            }, 500); // Transition duration
        }, 100);
    });

    // Fallback in case video doesn't play or has issues
    setTimeout(function() {
        if (!splashScreen.style.display || splashScreen.style.display !== "none") {
            // Start animations first
            startHomeAnimations();
            
            // Then fade out splash screen
            setTimeout(() => {
                splashScreen.style.opacity = "0";
                setTimeout(() => {
                    splashScreen.style.display = "none";
                }, 500);
            }, 100);
        }
    }, 6000); // Fallback timeout (adjust based on video length)
});
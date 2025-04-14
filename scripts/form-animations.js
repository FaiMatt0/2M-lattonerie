// Simplified animations for form elements - form-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const formInputs = document.querySelectorAll('.contactMe form input, .contactMe form select, .contactMe form textarea');
    const submitButton = document.querySelector('.contactMe form button');
    
    // Initial animation setup
    formInputs.forEach(input => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        input.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s, color 0.3s, box-shadow 0.3s';
    });
    
    if (submitButton) {
        submitButton.style.opacity = '0';
        submitButton.style.transform = 'translateY(20px)';
        submitButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s, color 0.3s, box-shadow 0.3s';
    }
    
    // Entrance animation
    function animateEntrance() {
        let delay = 0.1;
        
        formInputs.forEach(input => {
            setTimeout(() => {
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, delay * 1000);
            delay += 0.1;
        });
        
        if (submitButton) {
            setTimeout(() => {
                submitButton.style.opacity = '1';
                submitButton.style.transform = 'translateY(0)';
            }, delay * 1000);
        }
    }
    
    // Add hover effects to all form elements
    formInputs.forEach(input => {
        // Hover effect
        input.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        input.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Focus effect (same as hover for consistency)
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover and click effects for submit button
    if (submitButton) {
        submitButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        submitButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        submitButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        submitButton.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
    }
    
    // Add "typing" animation for textarea
    const textarea = document.querySelector('.contactMe form textarea');
    if (textarea) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes subtle-shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(1px); }
                75% { transform: translateX(-1px); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        
        textarea.addEventListener('input', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'subtle-shake 0.1s ease';
            }, 10);
        });
    }
    
    // Start the entrance animation after a short delay
    setTimeout(animateEntrance, 300);
});
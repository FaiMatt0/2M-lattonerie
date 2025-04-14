document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        grabCursor: true,
        allowTouchMove: true,
        resistance: true,
        resistanceRatio: 0,
        speed: 300,
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });

    // Service data
    const servicesData = [
        {
            title: "Coperture civili e industriali",
            content: "<p>Realizziamo coperture complete per ogni esigenza:</p><ul><li>Tetti in laterizio e metallo</li><li>Coperture ventilate</li><li>Soluzioni isolanti termo-acustiche</li><li>Strutture industriali personalizzate</li></ul>"
        },
        {
            title: "Lucernari e abbaini", 
            content: "<p>Soluzioni per illuminazione naturale:</p><ul><li>Lucernari fissi e apribili</li><li>Abbaini su misura</li><li>Vetri di sicurezza</li><li>Sistemi di ventilazione integrati</li></ul>"
        },
        {
            title: "Pluviali e grondaie",
            content: "<p>Sistemi completi per acque meteoriche:</p><ul><li>Grondaie in rame, alluminio e PVC</li><li>Pluviali con filtri anti-foglia</li><li>Sistemi di raccolta acqua piovana</li><li>Manutenzione e pulizia periodica</li></ul>"
        }
    ];

    // Open service box with improved transitions
    function openService(index) {
        const serviceBox = document.getElementById('serviceBox');
        document.getElementById('serviceBoxTitle').textContent = servicesData[index].title;
        document.getElementById('serviceBoxContent').innerHTML = servicesData[index].content;
        
        // Store current scroll position before fixing the body
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Apply fixed positioning to maintain visual position
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.overflow = 'hidden';
        
        // Show service box with proper transition timing
        serviceBox.classList.add('active');
        
        // Disable Swiper touch events
        swiper.allowTouchMove = false;
    }

    // Close service box with improved transitions
    function closeServiceBox() {
        const serviceBox = document.getElementById('serviceBox');
        
        // Get the scroll position from body's top style
        const scrollPosition = parseInt(document.body.style.top || '0') * -1;
        
        // Add transitioning-out class to ensure proper animation sequence
        serviceBox.classList.remove('active');
        
        // Use setTimeout to wait for transitions to complete before changing visibility
        setTimeout(() => {
            // Re-enable body scroll
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            
            // Restore the scroll position
            window.scrollTo(0, scrollPosition);
            
            // Re-enable Swiper touch events
            swiper.allowTouchMove = true;
        }, 300); // Match this timing with your CSS transition duration
    }

    // Close when pressing ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('serviceBox').classList.contains('active')) {
            closeServiceBox();
        }
    });

    // Make functions available globally
    window.openService = openService;
    window.closeServiceBox = closeServiceBox;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.alt = 'Gallery image';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const lightboxControls = document.createElement('div');
    lightboxControls.className = 'lightbox-controls';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-control';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-control';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    
    lightboxControls.appendChild(prevBtn);
    lightboxControls.appendChild(nextBtn);
    
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxCaption);
    
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(lightboxControls);
    
    document.body.appendChild(lightbox);
    
    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Show image in lightbox
    function showImage(index) {
        currentIndex = index;
        const galleryItem = galleryItems[index];
        const imgSrc = galleryItem.getAttribute('data-img');
        const imgCaption = galleryItem.getAttribute('data-caption');
        
        // First set image src and caption
        lightboxImg.src = 'images/' + imgSrc;
        lightboxCaption.textContent = imgCaption;
        
        // Add active class to show the lightbox
        lightbox.classList.add('active');
        
        // Disable swiper and body scroll
        if (window.swiper) {
            window.swiper.allowTouchMove = false;
        }
        
        // Save scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        
        // Get the scroll position
        const scrollPosition = parseInt(document.body.style.top || '0') * -1;
        
        // Re-enable swiper and body scroll
        setTimeout(() => {
            if (window.swiper) {
                window.swiper.allowTouchMove = true;
            }
            
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            
            // Restore scroll position
            window.scrollTo(0, scrollPosition);
        }, 300);
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const galleryItem = galleryItems[currentIndex];
        const imgSrc = galleryItem.getAttribute('data-img');
        const imgCaption = galleryItem.getAttribute('data-caption');
        
        // Animate transition
        lightboxContent.style.transform = 'translateX(-10px)';
        lightboxContent.style.opacity = '0.5';
        
        setTimeout(() => {
            lightboxImg.src = 'images/' + imgSrc;
            lightboxCaption.textContent = imgCaption;
            
            lightboxContent.style.transform = 'translateX(0)';
            lightboxContent.style.opacity = '1';
        }, 150);
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const galleryItem = galleryItems[currentIndex];
        const imgSrc = galleryItem.getAttribute('data-img');
        const imgCaption = galleryItem.getAttribute('data-caption');
        
        // Animate transition
        lightboxContent.style.transform = 'translateX(10px)';
        lightboxContent.style.opacity = '0.5';
        
        setTimeout(() => {
            lightboxImg.src = 'images/' + imgSrc;
            lightboxCaption.textContent = imgCaption;
            
            lightboxContent.style.transform = 'translateX(0)';
            lightboxContent.style.opacity = '1';
        }, 150);
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            prevImage();
        } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            nextImage();
        }
    });
    
    // Close on overlay click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add tap/click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            showImage(index);
        });
        
        // Create ripple effect on tap
        item.addEventListener('touchstart', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });
    
    // Add swipe functionality to lightbox
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swipe left
            nextImage();
        }
        if (touchEndX > touchStartX + 50) { // Swipe right
            prevImage();
        }
    }
    
    // Add the fade-in animation to gallery items
    function addFadeAnimation() {
        galleryItems.forEach(item => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        item.style.visibility = 'visible';
                        item.style.animation = item.dataset.animation || 'fadeIn 0.5s ease forwards';
                        observer.unobserve(item);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            observer.observe(item);
        });
    }
    
    // Call the function to initialize the animations
    addFadeAnimation();
});

// Add ripple effect styles
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s linear;
        width: 100px;
        height: 100px;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(galleryStyle);
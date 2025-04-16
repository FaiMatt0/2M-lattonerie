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
  
  // Make swiper globally available
  window.swiper = swiper;
  
  // Add functionality for the about page animation
  if (swiper) {
    swiper.on('slideChange', function() {
      // If navigating to slide index 1 (about page)
      if (this.activeIndex === 1 && window.runAboutAnimation) {
        window.runAboutAnimation();
      }
    });
    
    // Run animation if already on the about page
    if (swiper.activeIndex === 1 && window.runAboutAnimation) {
      window.runAboutAnimation();
    }
  }
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.alt = 'Gallery image';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  const closeBtnLightbox = document.createElement('button');
  closeBtnLightbox.className = 'lightbox-close';
  closeBtnLightbox.innerHTML = '&times;';
  
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
  
  lightbox.appendChild(closeBtnLightbox);
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
  closeBtnLightbox.addEventListener('click', closeLightbox);
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

document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the tab to show based on data-tab attribute
      const tabToShow = this.getAttribute('data-tab');
      
      // Hide all tab panels
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      
      // Show the selected tab panel
      if (tabToShow === 'info') {
        document.getElementById('info-panel').classList.add('active');
      } else if (tabToShow === 'form') {
        document.getElementById('form-panel').classList.add('active');
      }
      
      // If about tab was clicked
      if (tabToShow === 'about' && window.runAboutAnimation) {
        setTimeout(() => window.runAboutAnimation(), 300);
      }
    });
  });
  
  // For direct navigation links
  const aboutLinks = document.querySelectorAll('a[href="#about"], a[href="#chi-siamo"]');
  aboutLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.runAboutAnimation) {
        setTimeout(() => window.runAboutAnimation(), 300);
      }
    });
  });
});

// Add burger menu styles and functionality
document.addEventListener('DOMContentLoaded', function() {
// Add hamburger menu specific styles
const menuStyles = document.createElement('style');
menuStyles.textContent = `
  * {
    -webkit-tap-highlight-color: transparent;
  }

  *:focus {
    outline: none;
  }

  #menu-btn-container {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 39px;
    z-index: 1002;
    transform: scale(0.8);
  }

  #menu-btn {
    width: 39px;
    overflow: hidden;
  }

  #menu-checkbox {
    display: none;
  }

  #menu-label {
    position: relative;
    display: block;
    height: 29px;
    cursor: pointer;
  }

  #menu-label:before,
  #menu-label:after,
  #menu-bar {
    position: absolute;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #fff;
    border-radius: 2px;
  }

  #menu-label:before,
  #menu-label:after {
    content: "";
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) left;
  }

  #menu-label:before {
    top: 0;
  }

  #menu-label:after {
    top: 12px;
  }

  #menu-bar {
    top: 24px;
  }

  #menu-bar:before {
    content: "MENU";
    position: absolute;
    top: 5px;
    right: 0;
    left: 0;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
    text-align: center;
  }

  #menu-checkbox:checked + #menu-label:before {
    left: -39px;
  }

  #menu-checkbox:checked + #menu-label:after {
    left: 39px;
  }

  #menu-checkbox:checked + #menu-label #menu-bar:before {
    animation: moveUpThenDown 0.8s ease 0.2s forwards,
      shakeWhileMovingUp 0.8s ease 0.2s forwards,
      shakeWhileMovingDown 0.2s ease 0.8s forwards;
  }

  @keyframes moveUpThenDown {
    0% {
      top: 0;
    }
    50% {
      top: -27px;
    }
    100% {
      top: -14px;
    }
  }

  @keyframes shakeWhileMovingUp {
    0% {
      transform: rotateZ(0);
    }
    25% {
      transform: rotateZ(-10deg);
    }
    50% {
      transform: rotateZ(0deg);
    }
    75% {
      transform: rotateZ(10deg);
    }
    100% {
      transform: rotateZ(0);
    }
  }

  @keyframes shakeWhileMovingDown {
    0% {
      transform: rotateZ(0);
    }
    80% {
      transform: rotateZ(3deg);
    }
    90% {
      transform: rotateZ(-3deg);
    }
    100% {
      transform: rotateZ(0);
    }
  }

  /* Mobile Menu Styles - Starting from header bottom */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    visibility: hidden;
    pointer-events: none;
  }

  .mobile-menu.active {
    visibility: visible;
    pointer-events: all;
  }

  .menu-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(3px);
  }

  .mobile-menu.active .menu-backdrop {
    opacity: 1;
  }

  /* Start menu from header bottom */
  .menu-content {
    position: absolute;
    top: 60px; /* Header height */
    right: -300px;
    width: 300px;
    height: calc(100% - 60px);
    background-color: #111;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
    overflow-y: auto;
  }

  .mobile-menu.active .menu-content {
    right: 0;
  }

  .mobile-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-menu ul li {
    margin: 0;
    transform: translateX(50px);
    opacity: 0;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .mobile-menu.active ul li {
    transform: translateX(0);
    opacity: 1;
  }

  .mobile-menu.active ul li:nth-child(1) { transition-delay: 0.1s; }
  .mobile-menu.active ul li:nth-child(2) { transition-delay: 0.2s; }
  .mobile-menu.active ul li:nth-child(3) { transition-delay: 0.3s; }
  .mobile-menu.active ul li:nth-child(4) { transition-delay: 0.4s; }
  .mobile-menu.active ul li:nth-child(5) { transition-delay: 0.5s; }

  .mobile-menu ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    display: block;
    padding: 16px 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .mobile-menu ul li a:hover,
  .mobile-menu ul li a:focus {
    background-color: rgba(255, 107, 0, 0.1);
    color: #FF6B00;
    border-left: 4px solid #FF6B00;
  }

  /* Ensure header is above menu */
  .swiper-header {
    z-index: 1001;
    position: relative;
  }

  /* Prevent scrolling when menu is open */
  body.menu-open {
    overflow: hidden;
  }
`;
document.head.appendChild(menuStyles);

// Add functionality for the burger menu
const menuCheckbox = document.getElementById('menu-checkbox');
const mobileMenu = document.querySelector('.mobile-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');
const navLinks = document.querySelectorAll('.nav-link');

if (menuCheckbox) {
  menuCheckbox.addEventListener('change', function() {
    if (this.checked) {
      mobileMenu.classList.add('active');
      document.body.classList.add('menu-open');
    } else {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// Close menu when backdrop is clicked
if (menuBackdrop) {
  menuBackdrop.addEventListener('click', function() {
    menuCheckbox.checked = false;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
}

// Close menu when navigation links are clicked
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    menuCheckbox.checked = false;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    menuCheckbox.checked = false;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});
});
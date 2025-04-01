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

    // Open service box
    function openService(index) {
        const serviceBox = document.getElementById('serviceBox');
        document.getElementById('serviceBoxTitle').textContent = servicesData[index].title;
        document.getElementById('serviceBoxContent').innerHTML = servicesData[index].content;
        
        // Disable body scroll but keep Swiper active
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Show service box
        serviceBox.classList.add('active');
        
        // Temporarily disable touch events on Swiper
        swiper.allowTouchMove = false;
    }

    // Close service box
    function closeServiceBox() {
        const serviceBox = document.getElementById('serviceBox');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        // Hide service box
        serviceBox.classList.remove('active');
        
        // Re-enable Swiper touch events
        swiper.allowTouchMove = true;
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
});
// Add overlay styles
const style = document.createElement('style');
style.textContent = `
    .service-box-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
    }
    .service-box-overlay.active {
        opacity: 1;
    }
    body.service-box-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }
`;

document.head.appendChild(style);
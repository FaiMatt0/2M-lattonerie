// Service data - defined globally to ensure accessibility
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

// Service box functions defined globally
function openService(index) {
    console.log("openService chiamata con indice:", index); // Debug
    
    const serviceBox = document.getElementById('serviceBox');
    if (!serviceBox) {
        console.error('Service box element not found!');
        return;
    }
    
    const titleElement = document.getElementById('serviceBoxTitle');
    const contentElement = document.getElementById('serviceBoxContent');
    
    if (!titleElement || !contentElement) {
        console.error('Service box title or content element not found!');
        return;
    }
    
    if (!servicesData[index]) {
        console.error('Service data not found for index:', index);
        return;
    }
    
    // Aggiorna il contenuto
    titleElement.textContent = servicesData[index].title;
    contentElement.innerHTML = servicesData[index].content;
    
    // Store current scroll position before fixing the body
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Apply fixed positioning to maintain visual position
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.overflow = 'hidden';
    
    // Show service box with proper transition timing
    serviceBox.classList.add('active');
    
    // Disable Swiper touch events if swiper exists
    if (window.swiper) {
        window.swiper.allowTouchMove = false;
    }
}

function closeService() {
    console.log("closeService chiamata"); // Debug
    
    const serviceBox = document.getElementById('serviceBox');
    if (!serviceBox) {
        console.error('Service box element not found!');
        return;
    }
    
    // Get the scroll position from body's top style
    const scrollPosition = parseInt(document.body.style.top || '0') * -1;
    
    // Remove active class to trigger transition
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
        
        // Re-enable Swiper touch events if swiper exists
        if (window.swiper) {
            window.swiper.allowTouchMove = true;
        }
    }, 300); // Match this timing with your CSS transition duration
}

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
    
    // IMPORTANTE: Rimuovere gli onclick HTML per evitare doppie chiamate
    // Se non puoi modificare l'HTML, lascia solo un metodo di gestione
    // Commenta questa sezione e usa solo gli onclick HTML
    /*
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            openService(index);
        });
    });
    */
    
    // Close when pressing ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('serviceBox').classList.contains('active')) {
            closeService();
        }
    });
    
    // Aggiungi event listener al pulsante di chiusura
    const closeServiceButton = document.querySelector('.close-service-box');
    if (closeServiceButton) {
        closeServiceButton.addEventListener('click', closeService);
    } else {
        console.error("Pulsante di chiusura non trovato!");
    }
    
    // Aggiungi event listener al service box overlay
    const overlay = document.querySelector('.service-box-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeService);
    } else {
        console.error("Overlay non trovato!");
    }
});

// Se preferisci mantenere gli onclick inline, assicurati che siano definiti globalmente
window.openService = openService;
window.closeService = closeService;
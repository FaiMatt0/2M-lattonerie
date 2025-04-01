document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione Swiper
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

    // Dati dei servizi
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

    // Funzioni del service box
    function openService(index) {
        const box = document.getElementById('serviceBoxMobile');
        const overlay = document.createElement('div');
        overlay.className = 'service-box-overlay active';
        document.body.appendChild(overlay);

        // Disabilita lo swiper quando il service box è aperto
        swiper.disable();

        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('serviceBoxTitle').textContent = servicesData[index].title;
        document.getElementById('serviceBoxContent').innerHTML = servicesData[index].content;
        box.classList.add('active');
        document.body.classList.add('service-box-open');

        overlay.addEventListener('click', closeServiceBox);
    }

    function closeServiceBox() {
        const box = document.getElementById('serviceBoxMobile');
        const overlay = document.querySelector('.service-box-overlay');
        
        box.classList.remove('active');
        document.body.classList.remove('service-box-open');
        
        // Riabilita lo swiper
        swiper.enable();
        
        if (overlay) {
            setTimeout(() => {
                overlay.remove();
            }, 400);
        }
    }

    // Chiudi con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('serviceBoxMobile').classList.contains('active')) {
            closeServiceBox();
        }
    });

    // Esponi le funzioni globalmente se necessario
    window.openService = openService;
    window.closeServiceBox = closeServiceBox;
});

// CSS aggiuntivo necessario
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
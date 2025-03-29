document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione Swiper
    const swiper = new Swiper('.swiper-container', {
        // Configurazione Swiper
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

    // Funzioni per il modal dei servizi
    function openService(index) {
        const modal = document.getElementById('serviceModal');
        document.getElementById('modalTitle').textContent = servicesData[index].title;
        document.getElementById('modalContent').innerHTML = servicesData[index].content;
        modal.style.display = "block";
    }

    function closeService() {
        document.getElementById('serviceModal').style.display = "none";
    }

    // Chiudi modal cliccando fuori
    window.onclick = function(event) {
        const modal = document.getElementById('serviceModal');
        if (event.target == modal) {
            closeService();
        }
    }

    // Navigazione da URL hash
    if (window.location.hash) {
        const targetIndex = {
            '#home': 0,
            '#about': 1,
            '#services': 2,
            '#gallery': 3,
            '#contact': 4
        }[window.location.hash];
        
        if (targetIndex !== undefined) {
            swiper.slideTo(targetIndex);
        }
    }

    // Animazioni al cambio slide
    swiper.on('slideChange', function() {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
            if (index === swiper.activeIndex) {
                bullet.classList.add('swiper-pagination-bullet-active');
            } else {
                bullet.classList.remove('swiper-pagination-bullet-active');
            }
        });
    });
});
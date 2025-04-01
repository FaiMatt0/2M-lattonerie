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
});

//services
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

function openService(index) {
    const box = document.getElementById('serviceBoxMobile');
    const overlay = document.createElement('div');
    overlay.className = 'service-box-overlay active';
    document.body.appendChild(overlay);

    document.getElementById('serviceBoxTitle').textContent = servicesData[index].title;
    document.getElementById('serviceBoxContent').innerHTML = servicesData[index].content;

    box.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Scroll to the top of the page after the service box is visible
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // Chiudi cliccando sull'overlay
    overlay.addEventListener('click', closeServiceBox);
}

function closeServiceBox() {
    const box = document.getElementById('serviceBoxMobile');
    const overlay = document.querySelector('.service-box-overlay');
    
    box.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    if (overlay) {
        setTimeout(() => {
            overlay.remove();
        }, 400);
    }
}

// Chiudi con tasto indietro su Android
document.addEventListener('backbutton', closeServiceBox, false);

// Chiudi con tasto ESC su browser
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('serviceBoxMobile').classList.contains('active')) {
        closeServiceBox();
    }
});

document.querySelector('.service-box-overlay').addEventListener('transitionend', function () {
    if (this.classList.contains('active')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: true
});

swiper.on('slideChange', function () {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[swiper.activeIndex].classList.add("activeLink")

});

function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
}

function GoToHome() {
    window.location.href = '../index.html';
}

// Contenuti dei servizi
const serviceContents = [
    {
        title: "Coperture civili e industriali",
        description: "Realizziamo coperture complete per ogni esigenza:<br><br>" +
                     "• Tetti in laterizio e metallo<br>" +
                     "• Coperture ventilate<br>" +
                     "• Soluzioni isolanti termo-acustiche<br>" +
                     "• Strutture industriali personalizzate"
    },
    {
        title: "Lucernari e abbaini",
        description: "Soluzioni illuminazione naturale:<br><br>" +
                     "• Lucernari fissi e apribili<br>" +
                     "• Abbaini su misura<br>" +
                     "• Vetri di sicurezza<br>" +
                     "• Sistemi di ventilazione integrati"
    },
    {
        title: "Pluviali e grondaie",
        description: "Sistemi completi per acque meteoriche:<br><br>" +
                     "• Grondaie in rame, alluminio e PVC<br>" +
                     "• Pluviali con filtri anti-foglia<br>" +
                     "• Sistemi di raccolta acqua piovana<br>" +
                     "• Manutenzione e pulizia periodica"
    }
];

function OpenService(index) {
    const serviceBox = document.querySelector('.service-box');
    const serviceBoxContent = document.querySelector('.service-box-content');
    
    // Contenuti dei servizi
    const serviceContents = [
        {
            title: 'Coperture civili e industriali',
            description: 'Realizziamo coperture per edifici civili e industriali utilizzando materiali di alta qualità che garantiscono durata e resistenza agli agenti atmosferici. I nostri interventi includono sia nuove installazioni che ristrutturazioni, con soluzioni personalizzate in base alle vostre esigenze specifiche. Lavoriamo con diversi materiali come rame, zinco-titanio, alluminio e acciaio inox, per garantire il miglior risultato estetico e funzionale.',
            image1: 'images/20180712_154302.jpg',
            image2: 'images/IMG_20221103_170101.jpg'
        },
        {
            title: 'Lucernari e abbaini',
            description: 'Progettiamo e installiamo lucernari e abbaini di alta qualità, perfetti per illuminare naturalmente i vostri spazi interni. Le nostre soluzioni sono studiate per garantire un\'ottima illuminazione, ventilazione e un aspetto estetico in armonia con l\'architettura dell\'edificio. Utilizziamo materiali resistenti e sistemi di impermeabilizzazione avanzati per prevenire infiltrazioni e garantire la massima efficienza energetica.',
            image1: 'images/20180319_173414.jpg',
            image2: 'images/20180321_133741.jpg'
        },
        {
            title: 'Pluviali e grondaie',
            description: 'Installiamo sistemi di raccolta e smaltimento delle acque piovane efficienti e duraturi. I nostri pluviali e grondaie sono realizzati con materiali di alta qualità come rame, acciaio zincato, alluminio preverniciato e acciaio inox, garantendo resistenza alla corrosione e lunga durata nel tempo. Ogni installazione è progettata su misura per adattarsi perfettamente all\'estetica e alle necessità funzionali del vostro edificio.',
            image1: 'images/20140411_164727.jpg',
            image2: 'images/IMG_20230406_172747.jpg'
        }
    ];
    
    // Aggiorna il contenuto della service box
    const selectedService = serviceContents[index];
    serviceBoxContent.innerHTML = `
        <h3>${selectedService.title}</h3>
        <p>${selectedService.description}</p>
        <div class="close-btn" onclick="CloseService()">&times;</div>
    `;
    
    // Aggiorna le immagini
    const imageElements = document.querySelectorAll('.service-image');
    imageElements[0].src = selectedService.image1;
    imageElements[1].src = selectedService.image2;
    
    // Mostra la service box
    serviceBox.classList.add('active');
}

function CloseService() {
    const serviceBox = document.querySelector('.service-box');
    serviceBox.classList.remove('active');
}


// Chiudi premendo ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') CloseService();
});

function HighlightImage(index) {
    const images = document.querySelectorAll('.citation-image');
    images.forEach((img, i) => {
        if (i !== index) img.style.opacity = '0';
    });
}

function ResetImages() {
    const images = document.querySelectorAll('.citation-image');
    images.forEach(img => {
        img.style.opacity = '1';
    });
}

// Aggiungi gli event listener alle immagini
document.querySelectorAll('.citation-image').forEach((img, index) => {
    img.addEventListener('mouseenter', () => HighlightImage(index));
    img.addEventListener('mouseleave', ResetImages);
});

if (window.innerWidth <= 768 && !window.location.href.includes('mobile.html')) {
    window.location.href = 'mobile.html';
}

// Inizializza il modulo di contatto
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value,
    };

    try {
        const response = await fetch('https://tuodominio.com/send-email', { // Cambia con l'URL del tuo backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Messaggio inviato con successo!');
            e.target.reset();
        } else {
            alert('Errore durante l\'invio del messaggio.');
        }
    } catch (error) {
        console.error('Errore:', error);
        alert('Errore durante l\'invio del messaggio.');
    }
});

// Gestione hover immagini galleria
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Calcola la posizione per evitare che l'immagine esca dallo schermo
        const rect = this.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        if (rect.right * 1.5 > viewportWidth) {
            this.style.transformOrigin = 'right center';
        } else if (rect.left * 1.5 < 0) {
            this.style.transformOrigin = 'left center';
        } else {
            this.style.transformOrigin = 'center center';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transformOrigin = 'center center';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        const banner = document.querySelector('.cookies-consent');
        banner.style.display = 'flex';
        banner.style.animation = 'fadeIn 0.5s ease-in-out';
    }
});
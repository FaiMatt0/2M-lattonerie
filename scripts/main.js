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
    const overlay = document.createElement('div');
    overlay.className = 'service-box-overlay';
    document.body.appendChild(overlay);
    
    // Imposta il contenuto
    serviceBox.innerHTML = `
        <h3>${serviceContents[index].title}</h3>
        <p>${serviceContents[index].description}</p>
        <div class="close-btn" onclick="CloseService()">×</div>
    `;
    
    // Mostra box e overlay
    serviceBox.classList.add('active');
    overlay.classList.add('active');
    
    // Chiudi cliccando sull'overlay
    overlay.addEventListener('click', CloseService);
}

function CloseService() {
    const serviceBox = document.querySelector('.service-box');
    const overlay = document.querySelector('.service-box-overlay');
    
    if (serviceBox) serviceBox.classList.remove('active');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300); // Aspetta la transizione
    }
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
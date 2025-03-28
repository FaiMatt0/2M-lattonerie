document.addEventListener('DOMContentLoaded', function() {
    // Highlight nav item on scroll
    const sections = document.querySelectorAll('.mobile-section');
    const navItems = document.querySelectorAll('.header-nav a');
    
    // Observer per sezioni
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll per anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animazioni al caricamento
    gsap.from('.mobile-header', { 
        y: -100, 
        duration: 0.8, 
        ease: 'power3.out' 
    });
    
    gsap.from('.home-content', { 
        opacity: 0, 
        y: 50, 
        duration: 0.8, 
        delay: 0.3 
    });
    
    gsap.from('.home-image', { 
        opacity: 0, 
        y: 50, 
        duration: 0.8, 
        delay: 0.5 
    });
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1
        });
    });
    
    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: i * 0.1
        });
    });
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
        modal.style.display = "none";
    }
}
// Crea un nuovo file gallery-style-popup.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery-style popup inizializzato');
    
    // ----- SETUP DEI POPUP (COME FA LA GALLERIA) -----
    
    // 1. Creazione dinamica degli elementi del popup per i servizi (come fa la galleria)
    const servicePopup = document.createElement('div');
    servicePopup.className = 'service-popup';
    
    const servicePopupContent = document.createElement('div');
    servicePopupContent.className = 'popup-content';
    
    const closeServiceBtn = document.createElement('button');
    closeServiceBtn.className = 'popup-close';
    closeServiceBtn.innerHTML = '&times;';
    
    const serviceTitle = document.createElement('h2');
    serviceTitle.className = 'popup-title';
    
    const serviceBody = document.createElement('div');
    serviceBody.className = 'popup-body';
    
    servicePopupContent.appendChild(closeServiceBtn);
    servicePopupContent.appendChild(serviceTitle);
    servicePopupContent.appendChild(serviceBody);
    servicePopup.appendChild(servicePopupContent);
    
    document.body.appendChild(servicePopup);
    
    // 2. Creazione dinamica degli elementi del popup per le aziende
    const companiesPopup = document.createElement('div');
    companiesPopup.className = 'companies-popup';
    
    const companiesPopupContent = document.createElement('div');
    companiesPopupContent.className = 'popup-content';
    
    const closeCompaniesBtn = document.createElement('button');
    closeCompaniesBtn.className = 'popup-close';
    closeCompaniesBtn.innerHTML = '&times;';
    
    const companiesTitle = document.createElement('h2');
    companiesTitle.className = 'popup-title';
    companiesTitle.textContent = 'Aziende che hanno creduto in noi';
    
    const companiesBody = document.createElement('div');
    companiesBody.className = 'popup-body';
    
    // Creazione griglia aziende
    const companiesGrid = document.createElement('div');
    companiesGrid.className = 'companies-grid';
    
    // Array of real companies with their image paths and names
    const companies = [
        { name: "Artedil", imagePath: "images/aziende/artedil.jpg" },
        { name: "Bellunese", imagePath: "images/aziende/bellunese.png" },
        { name: "Canapulo", imagePath: "images/aziende/canapulo.jpg" },
        { name: "Fasan", imagePath: "images/aziende/fasan.png" },
        { name: "Gregoul", imagePath: "images/aziende/gregoul.jpg" },
        { name: "IZC", imagePath: "images/aziende/izc.png" },
        { name: "Manelli", imagePath: "images/aziende/manelli.jpg" },
        { name: "Moschetta", imagePath: "images/aziende/moschetta.png" },
        { name: "Novedil", imagePath: "images/aziende/novedil.png" },
        { name: "Spagnol", imagePath: "images/aziende/spagnol.png" }
    ];
    
    // Create company items with real data
    companies.forEach(company => {
        const companyItem = document.createElement('div');
        companyItem.className = 'company-item';
        
        const companyLogo = document.createElement('img');
        companyLogo.src = company.imagePath;
        companyLogo.alt = company.name;
        companyLogo.className = 'company-logo';
        
        const companyName = document.createElement('div');
        companyName.className = 'company-name';
        companyName.textContent = company.name;
        
        companyItem.appendChild(companyLogo);
        companyItem.appendChild(companyName);
        companiesGrid.appendChild(companyItem);
    });
    
    // Aggiungi "e molte altre..." alla fine della griglia delle aziende
    const moreCompaniesText = document.createElement('div');
    moreCompaniesText.className = 'more-companies';
    moreCompaniesText.textContent = 'e molte altre...';
    companiesGrid.appendChild(moreCompaniesText);
    
    companiesBody.appendChild(companiesGrid);
    companiesPopupContent.appendChild(closeCompaniesBtn);
    companiesPopupContent.appendChild(companiesTitle);
    companiesPopupContent.appendChild(companiesBody);
    companiesPopup.appendChild(companiesPopupContent);
    
    document.body.appendChild(companiesPopup);
    
    // Aggiunta stili CSS dinamicamente (come fa la galleria)
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
        .service-popup, .companies-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0s linear 0.3s;
        }
        
        .service-popup.active, .companies-popup.active {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.3s ease, visibility 0s linear;
        }
        
        .popup-content {
            background-color: #f39c12;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            border-radius: 15px;
            padding: 25px;
            position: relative;
            overflow-y: auto;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
        }
        
        .popup-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 28px;
            background: none;
            border: none;
            color: #293133;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
        }
        
        .popup-title {
            font-size: 24px;
            color: #293133;
            margin-bottom: 20px;
            padding-right: 40px;
        }
        
        .popup-body {
            color: #293133;
            line-height: 1.5;
        }
        
        .popup-body p {
            margin-bottom: 15px;
        }
        
        .popup-body ul {
            padding-left: 20px;
            margin-bottom: 15px;
        }
        
        .popup-body li {
            margin-bottom: 8px;
        }
        
        /* Companies Grid */
        .companies-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding: 10px 0;
        }
        
        .company-item {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .company-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        
        .company-logo {
            width: 100%;
            height: 80px;
            object-fit: contain;
            padding: 10px;
        }
        
        .company-name {
            padding: 10px;
            text-align: center;
            font-weight: 500;
            color: #293133;
            background-color: #f5f5f5;
            width: 100%;
            border-top: 1px solid #eee;
        }
        
        .more-companies {
            grid-column: 1 / -1;
            text-align: center;
            font-style: italic;
            color: #293133;
            margin-top: 10px;
            font-size: 18px;
            padding: 10px;
        }
        
        @media (min-width: 480px) {
            .companies-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        @media (min-width: 768px) {
            .companies-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;
    
    document.head.appendChild(popupStyle);
    
    // ----- DATI DEI SERVIZI -----
    const serviceData = [
        {
            title: "Coperture civili e industriali",
            content: `
                <p>Offriamo soluzioni personalizzate per coperture di edifici civili e industriali, utilizzando materiali di alta qualità e tecniche all'avanguardia.</p>
                <p>I nostri servizi includono:</p>
                <ul>
                    <li>Progettazione e installazione di coperture metalliche</li>
                    <li>Rifacimento e manutenzione di tetti esistenti</li>
                    <li>Impermeabilizzazioni</li>
                    <li>Isolamento termico e acustico</li>
                    <li>Coperture speciali per edifici industriali</li>
                </ul>
                <p>Ogni progetto viene seguito con la massima attenzione, garantendo resistenza e durata nel tempo.</p>
            `
        },
        {
            title: "Lucernari e abbaini",
            content: `
                <p>Progettiamo e installiamo lucernari e abbaini per portare luce naturale negli ambienti interni, migliorando il comfort abitativo e riducendo i consumi energetici.</p>
                <p>La nostra offerta comprende:</p>
                <ul>
                    <li>Lucernari fissi e apribili</li>
                    <li>Abbaini su misura</li>
                    <li>Finestre per tetti</li>
                    <li>Cupole di illuminazione</li>
                    <li>Sistemi di ventilazione integrati</li>
                </ul>
                <p>Realizziamo soluzioni esteticamente gradevoli che si integrano perfettamente con l'architettura dell'edificio.</p>
            `
        },
        {
            title: "Pluviali e grondaie",
            content: `
                <p>Installiamo sistemi completi per la gestione delle acque piovane, utilizzando materiali resistenti agli agenti atmosferici e di alta qualità estetica.</p>
                <p>I nostri servizi comprendono:</p>
                <ul>
                    <li>Fornitura e posa di grondaie e pluviali</li>
                    <li>Sistemi di raccolta acqua piovana</li>
                    <li>Manutenzione e pulizia</li>
                    <li>Sostituzioni parziali o complete</li>
                    <li>Soluzioni personalizzate per edifici storici</li>
                </ul>
                <p>Garantiamo installazioni a regola d'arte che prevengono infiltrazioni e danni strutturali.</p>
            `
        }
    ];
    
    // ----- FUNZIONI PER APRIRE/CHIUDERE I POPUP -----
    
    // Funzione per aprire il popup dei servizi (simile a showImage nella galleria)
    function openServicePopup(index) {
        console.log('Apertura popup servizio', index);
        
        // Imposta il contenuto
        serviceTitle.textContent = serviceData[index].title;
        serviceBody.innerHTML = serviceData[index].content;
        
        // Mostra il popup
        servicePopup.classList.add('active');
        
        // Disabilita swiper e body scroll
        if (window.swiper) {
            window.swiper.allowTouchMove = false;
        }
        
        // Salva la posizione di scroll
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.overflow = 'hidden';
    }
    
    // Funzione per chiudere il popup dei servizi
    function closeServicePopup() {
        console.log('Chiusura popup servizio');
        
        servicePopup.classList.remove('active');
        
        // Ripristina lo scroll
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
        }, 10);
    }
    
    // Funzione per aprire il popup delle aziende
    function openCompaniesPopup() {
        console.log('Apertura popup aziende');
        
        // Mostra il popup
        companiesPopup.classList.add('active');
        
        // Disabilita swiper e body scroll
        if (window.swiper) {
            window.swiper.allowTouchMove = false;
        }
        
        // Salva la posizione di scroll
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.overflow = 'hidden';
    }
    
    // Funzione per chiudere il popup delle aziende
    function closeCompaniesPopup() {
        console.log('Chiusura popup aziende');
        
        companiesPopup.classList.remove('active');
        
        // Ripristina lo scroll
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
        }, 10);
    }
    
    // ----- EVENT LISTENERS -----
    
    // Aggiungi event listener per le service card
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards && serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                openServicePopup(index);
            });
        });
    } else {
        console.warn('Nessuna service card trovata');
    }
    
    // Aggiungi event listener per il pulsante delle aziende
    const companiesBtn = document.getElementById('showCompaniesBtn');
    if (companiesBtn) {
        companiesBtn.addEventListener('click', function() {
            console.log('Pulsante aziende cliccato');
            openCompaniesPopup();
        });
    } else {
        console.warn('Pulsante showCompaniesBtn non trovato');
    }
    
    // Aggiungi event listener per i pulsanti di chiusura
    closeServiceBtn.addEventListener('click', closeServicePopup);
    closeCompaniesBtn.addEventListener('click', closeCompaniesPopup);
    
    // Chiudi con il tasto Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (servicePopup.classList.contains('active')) {
                closeServicePopup();
            }
            if (companiesPopup.classList.contains('active')) {
                closeCompaniesPopup();
            }
        }
    });
    
    // Chiudi quando si clicca fuori dal contenuto
    servicePopup.addEventListener('click', function(e) {
        if (e.target === servicePopup) {
            closeServicePopup();
        }
    });
    
    companiesPopup.addEventListener('click', function(e) {
        if (e.target === companiesPopup) {
            closeCompaniesPopup();
        }
    });
});
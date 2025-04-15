// Crea un nuovo file cookie-handler.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cookie handler inizializzato');
    
    // Verifica se il banner dei cookie è già nel DOM
    let cookieConsent = document.getElementById('cookieConsent');
    
    // Se non esiste, crealo dinamicamente
    if (!cookieConsent) {
        console.log('Creazione dinamica del banner cookie');
        
        // Creazione del banner cookie
        cookieConsent = document.createElement('div');
        cookieConsent.id = 'cookieConsent';
        cookieConsent.className = 'cookies-consent';
        
        // Contenuto del banner
        cookieConsent.innerHTML = `
            <p>Utilizziamo i cookie per garantire la migliore esperienza.</p>
            <a href="pages/privacy.html" class="privacy-link">Scopri di più</a>
            <div class="cookies-buttons">
                <button id="acceptBtn" class="accept-cookies-btn">Accetta</button>
                <button id="rejectBtn" class="reject-cookies-btn">Rifiuta</button>
            </div>
        `;
        
        // Aggiungi il banner al body
        document.body.appendChild(cookieConsent);
    }
    
    // Ottieni i riferimenti ai pulsanti
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    
    // Funzione per accettare i cookie
    function acceptCookies() {
        console.log('Cookie accettati');
        localStorage.setItem('cookieConsent', 'accepted'); // Salva nel localStorage
        cookieConsent.classList.add('hidden');
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 300); // Attendi che l'animazione finisca
    }
    
    // Funzione per rifiutare i cookie
    function rejectCookies() {
        console.log('Cookie rifiutati');
        localStorage.setItem('cookieConsent', 'rejected'); // Salva nel localStorage
        cookieConsent.classList.add('hidden');
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 300); // Attendi che l'animazione finisca
    }
    
    // Aggiungi event listeners ai pulsanti
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectCookies);
    }
    
    // Controlla se l'utente ha già fatto una scelta utilizzando localStorage
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
        console.log('Consenso cookie già espresso:', consent);
        cookieConsent.style.display = 'none';
    } else {
        console.log('Nessun consenso cookie trovato, mostro il banner');
        // Assicurati che il banner sia visibile
        cookieConsent.style.display = 'flex';
        
        // Aggiungi un effetto di entrata con un piccolo ritardo
        setTimeout(() => {
            cookieConsent.classList.add('visible');
        }, 500);
    }
    
    // Aggiungi stili CSS dinamicamente (se necessario)
    const cookieStyle = document.createElement('style');
    cookieStyle.textContent = `
        .cookies-consent {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #293133;
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            max-width: 350px;
            z-index: 9000;
            text-align: left;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s;
            visibility: hidden;
        }
        
        .cookies-consent.visible {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .cookies-consent.hidden {
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden;
        }
        
        .cookies-consent p {
            margin: 0;
            font-size: 1rem;
            line-height: 1.5;
        }
        
        .cookies-consent .privacy-link {
            color: #f39c12;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        
        .cookies-consent .privacy-link:hover {
            color: #d88b0e;
            text-decoration: underline;
        }
        
        .cookies-buttons {
            display: flex;
            gap: 10px;
            width: 100%;
            justify-content: flex-start;
        }
        
        .accept-cookies-btn,
        .reject-cookies-btn {
            background-color: #f39c12;
            color: #293133;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        
        .accept-cookies-btn:hover,
        .reject-cookies-btn:hover {
            background-color: #d88b0e;
            transform: scale(1.05);
        }
    `;
    
    document.head.appendChild(cookieStyle);
});
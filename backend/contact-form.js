// Simplified contact form handler
document.addEventListener('DOMContentLoaded', function() {
    // Get both form elements
    const desktopForm = document.querySelector('.contactMe form');
    const mobileForm = document.getElementById('contactForm');
    
    // Set up event handlers
    if (desktopForm) {
        console.log('Desktop form found, setting up handler');
        desktopForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.log('Desktop form not found');
    }
    
    if (mobileForm) {
        console.log('Mobile form found, setting up handler');
        mobileForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.log('Mobile form not found');
    }
    
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Form submission initiated');
        
        // Get form data
        const form = event.target;
        const isDesktopForm = form.closest('.contactMe') !== null;
        let formData = {};
        
        if (isDesktopForm) {
            // Desktop form (simple version)
            const inputs = form.querySelectorAll('input, textarea');
            formData = {
                name: inputs[0].value.trim(),
                email: inputs[1].value.trim(),
                message: inputs[2].value.trim(),
                subject: 'informazioni'
            };
            console.log('Desktop form data:', formData);
        } else {
            // Mobile form
            formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
                subject: document.getElementById('subject') ? document.getElementById('subject').value : 'informazioni',
                message: document.getElementById('message').value.trim(),
                privacy: document.getElementById('privacy') ? document.getElementById('privacy').checked : true
            };
            console.log('Mobile form data:', formData);
        }
        
        // Disable submit button and show loading state
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.primary');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Invio in corso...';
        }
        
        // Determine the base URL
        const baseUrl = 'http://localhost:3000';
        
        // First, try the debug endpoint to verify form data is being received
        console.log('Sending to debug endpoint...');
        fetch(`${baseUrl}/debug-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Debug endpoint response:', data);
            
            // If debug succeeded, try the actual email endpoint
            console.log('Now sending to email endpoint...');
            return fetch(`${baseUrl}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        })
        .then(response => {
            console.log('Email endpoint status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Email endpoint response:', data);
            
            // Show success message
            alert('Messaggio inviato con successo!');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Errore durante l\'invio: ' + error.message);
        })
        .finally(() => {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
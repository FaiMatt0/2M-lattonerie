const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
origin: ['http://localhost:5000', 'https://2mlattonerie.it'], // Adjust with your actual domains
methods: ['POST'],
allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Simple rate limiting middleware
const requestCounts = {};
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5;

const rateLimiter = (req, res, next) => {
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

// Initialize or update counts
if (!requestCounts[ip]) {
    requestCounts[ip] = {
    count: 1,
    resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
} else {
    // Reset if window has passed
    if (Date.now() > requestCounts[ip].resetTime) {
    requestCounts[ip] = {
        count: 1,
        resetTime: Date.now() + RATE_LIMIT_WINDOW
    };
    } else {
    requestCounts[ip].count++;
    }
}

// Check if over limit
if (requestCounts[ip].count > MAX_REQUESTS_PER_IP) {
    return res.status(429).json({ 
    error: 'Troppe richieste. Riprova più tardi.',
    retryAfter: Math.ceil((requestCounts[ip].resetTime - Date.now()) / 1000 / 60) // minutes
    });
}

next();
};

// Validate email format
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

// Validate phone format (optional field)
function isValidPhone(phone) {
if (!phone) return true; // Phone is optional
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
return phoneRegex.test(phone);
}

// Endpoint for the contact form
app.post('/send-email', rateLimiter, async (req, res) => {
const { name, email, phone, subject, message, privacy } = req.body;

// Validate required fields
if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tutti i campi obbligatori devono essere compilati.' });
}

// Validate email format
if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Formato email non valido.' });
}

// Validate phone if provided
if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ error: 'Formato telefono non valido.' });
}

// Validate privacy consent
if (!privacy) {
    return res.status(400).json({ error: 'È necessario accettare la privacy policy.' });
}

try {
    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // Use true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    // Format the message with more details
    const emailSubjectMap = {
    'preventivo': 'Richiesta Preventivo',
    'informazioni': 'Richiesta Informazioni',
    'assistenza': 'Richiesta Assistenza Tecnica',
    'collaborazione': 'Proposta di Collaborazione',
    'altro': 'Altro'
    };

    const emailSubject = emailSubjectMap[subject] || 'Nuovo Messaggio dal Sito Web';

    // Configure email content
    const mailOptions = {
    from: `"Modulo di Contatto 2M Lattonerie" <${process.env.EMAIL_USER}>`,
    replyTo: `"${name}" <${email}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: `${emailSubject} da ${name}`,
    text: `
    Nome: ${name}
    Email: ${email}
    ${phone ? `Telefono: ${phone}` : 'Telefono: Non fornito'}
    Tipo di richiesta: ${emailSubjectMap[subject] || subject}
    Messaggio:
    ${message}

    Questa email è stata inviata dal modulo di contatto sul sito web 2M Lattonerie.
    Data e ora: ${new Date().toLocaleString('it-IT')}
    `,
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #f39c12;">Nuovo Messaggio da 2M Lattonerie</h2>
    </div>

    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
        <p><strong>Tipo di richiesta:</strong> ${emailSubjectMap[subject] || subject}</p>
    </div>

    <div style="margin-bottom: 20px;">
        <h3 style="color: #293133;">Messaggio:</h3>
        <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
    </div>

    <div style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
        <p>Questa email è stata inviata dal modulo di contatto sul sito web 2M Lattonerie.</p>
        <p>Data e ora: ${new Date().toLocaleString('it-IT')}</p>
    </div>
    </div>
    `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation to user
    if (process.env.SEND_CONFIRMATION === 'true') {
    const confirmationOptions = {
        from: `"2M Lattonerie" <${process.env.EMAIL_USER}>`,
        to: `"${name}" <${email}>`,
        subject: 'Abbiamo ricevuto il tuo messaggio',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #f39c12;">Abbiamo ricevuto il tuo messaggio</h2>
        </div>
        
        <div style="margin-bottom: 20px;">
            <p>Gentile ${name},</p>
            <p>Ti confermiamo che abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
            <p>Grazie per averci contattato!</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Riepilogo della tua richiesta:</strong></p>
            <p><strong>Tipo:</strong> ${emailSubjectMap[subject] || subject}</p>
            <p><strong>Messaggio:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 14px;">Cordiali saluti,</p>
            <p style="font-size: 14px;"><strong>Il Team di 2M Lattonerie</strong></p>
            <p style="font-size: 12px;">Tel: +39 348 0820434 | Email: 2emme.lattonerie@gmail.com</p>
            <p style="font-size: 12px;">Via Cesena Rivatte 20/B, Azzano Decimo (PN) 33082</p>
        </div>
        </div>
        `
    };
    
    try {
        await transporter.sendMail(confirmationOptions);
    } catch (error) {
        console.warn('Failed to send confirmation email:', error);
        // Continue execution, don't fail the request if confirmation fails
    }
    }

    res.status(200).json({ message: 'Email inviata con successo!' });
} catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    res.status(500).json({ error: 'Errore durante l\'invio dell\'email. Si prega di riprovare più tardi.' });
}
});

// Health check endpoint
app.get('/health', (req, res) => {
res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
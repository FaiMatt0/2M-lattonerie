const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint per il modulo di contatto
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tutti i campi obbligatori devono essere compilati.' });
    }

    try {
        // Configurazione del trasportatore SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // Usa true per la porta 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configurazione del messaggio email
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_RECEIVER,
            subject: `Nuovo messaggio da ${name}`,
            text: `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\nMessaggio:\n${message}`,
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email inviata con successo!' });
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
        res.status(500).json({ error: 'Errore durante l\'invio dell\'email.' });
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
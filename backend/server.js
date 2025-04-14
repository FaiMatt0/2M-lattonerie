const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - more permissive for testing
app.use(cors({
  origin: '*', // Allow all origins during testing
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files if needed
app.use(express.static('public'));

// Debug endpoint to verify form data
app.post('/debug-form', (req, res) => {
  console.log('DEBUG FORM DATA:');
  console.log(JSON.stringify(req.body, null, 2));
  
  res.status(200).json({
    message: 'Form data received successfully',
    data: req.body
  });
});

// Simple endpoint for the contact form (no rate limiting for testing)
app.post('/send-email', async (req, res) => {
  console.log('FORM SUBMISSION RECEIVED:');
  console.log(JSON.stringify(req.body, null, 2));
  
  try {
    const { name, email, phone, subject, message, privacy } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Create transporter with same settings as test-email.js
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true // Show debug output
    });

    // Verify connection first
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified');

    // Default subject if not provided
    const emailSubject = subject || 'Messaggio dal sito web';
    
    // Simplified email options
    const mailOptions = {
      from: `"Modulo di Contatto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Messaggio da ${name} - ${emailSubject}`,
      text: `
Nome: ${name}
Email: ${email}
${phone ? `Telefono: ${phone}` : ''}
Oggetto: ${subject || 'Non specificato'}
Messaggio:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Nuovo messaggio dal sito web</h2>
  <p><strong>Nome:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
  <p><strong>Oggetto:</strong> ${subject || 'Non specificato'}</p>
  <h3>Messaggio:</h3>
  <p>${message.replace(/\n/g, '<br>')}</p>
</div>
      `
    };

    // Send email with more detailed logging
    console.log('Sending email to:', process.env.EMAIL_RECEIVER);
    console.log('From:', process.env.EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully');
    console.log('Message ID:', info.messageId);
    
    // Return success response
    res.status(200).json({ 
      message: 'Email inviata con successo!',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('ERROR SENDING EMAIL:');
    console.error(error);
    
    res.status(500).json({ 
      error: 'Errore durante l\'invio dell\'email',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
      NODE_ENV: process.env.NODE_ENV || 'development'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Email configuration:');
  console.log('- HOST:', process.env.EMAIL_HOST);
  console.log('- PORT:', process.env.EMAIL_PORT);
  console.log('- USER:', process.env.EMAIL_USER);
  console.log('- RECEIVER:', process.env.EMAIL_RECEIVER);
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    const address = req.body['Home Address'];

    const mailOptions = {   
        from: 'arturoglz0204@gmail.com',
        to: 'arturoglz0204@gmail.com',
        subject: 'New Form Submission',
        text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });    

    
    // Render a response page or redirect to a success page
    res.sendFile(path.join(__dirname, '/public/submitForm.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

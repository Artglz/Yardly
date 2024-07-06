const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path'); // Ensure to import path for sendFile

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        const address = req.body['Home Address'];

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Form Submission',
            text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            res.status(200).sendFile(path.join(__dirname, '../public/submitForm.html'));
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

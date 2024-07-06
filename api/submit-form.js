const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        const address = req.body['Home Address'];

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'arturoglz0204@gmail.com', 
            subject: 'New Form Submission',
            text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            console.log('Email sent: ' + info.response);
            res.sendFile(path.join(__dirname, '../public/submitForm.html'));
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

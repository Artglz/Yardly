const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');

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

        // Send email asynchronously
        transporter.sendMail(mailOptions)
            .then(info => {
                console.log('Email sent: ' + info.response);
                // Redirect to a "Thank You" page or return a success message
                res.status(200).sendFile(path.join(__dirname, '../public/submitForm.html'));
            })
            .catch(error => {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            });

        // Immediately return a response to the client
        res.status(200).json({ message: 'Form submission received. Redirecting...' });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

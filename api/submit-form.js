// Import necessary modules
const nodemailer = require('nodemailer');
// Example inline HTML content for the "Thank you" page
const thankYouHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    h2{
        text-align: center;
        color: #fff;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color:   #00BF63;
    }
}
    </style>
</head>
<body>
    <img src="/public/Yardly.jpg" alt="">
    <h2>Thank you for submitting the Form!</h2>

</body>
</html>
`;

// Define your serverless function handler

require('dotenv').config();

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
            to: process.env.EMAIL_USER, 
            subject: 'New Form Submission',
            text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            console.log('Email sent: ' + info.response);
            res.status(200).send(thankYouHtml);
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};


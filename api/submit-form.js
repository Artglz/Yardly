// api/submitForm.js
// const nodemailer = require('nodemailer');
// require('dotenv').config();


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });


// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, email } = req.body;
//         const address = req.body['Home Address'];

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER, 
//             subject: 'New Form Submission',
//             text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return res.status(500).send(error.toString());
//             }
//             console.log('Email sent: ' + info.response);
//             res.status(200).json({ message: 'Email sent successfully' });
//         });
//     } else {
//         res.status(405).send('Method Not Allowed');
//     }
// }

// api/submitForm.js
import axios from 'axios';
require('dotenv').config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        const address = req.body['Home Address'];
        try {
            // Perform Google Search
            const searchQuery = `${address} site:zillow.com`;
            const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CUSTOM_SEARCH_CX}`;

            const response = await axios.get(searchUrl);
            const firstLink = response.data.items[0].link;

            res.status(200).json({ firstLink });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error performing Google search');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

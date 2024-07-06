// api/submitForm.js
const nodemailer = require('nodemailer');

async function sendEmail(name, email) {
    // Setup transporter using your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Form Submission',
        text: `Form submission received:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        const address = req.body['Home Address'];;
        try {
            await sendEmail(name, email, address);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

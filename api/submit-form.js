// Import necessary modules
import { parse } from 'querystring'; // For parsing form data

// Example inline HTML content for the "Thank you" page
const thankYouHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You!</title>
    <style>
        /* Your CSS styles here */
        h2 {
            text-align: center;
            color: #fff;
        }
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #00BF63;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        img {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <img src="Yardly.jpg" alt="">
    <h2>Thank you for submitting the Form!</h2>
</body>
</html>
`;

// Define your serverless function handler
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            let body = '';
            
            // Collect data from the request stream
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            // Parse the collected data when the request ends
            req.on('end', () => {
                const formData = parse(body);

                // Process the form data as needed
                const { name, email, address } = formData;
                
                // Example: Send email or store data in a database
                // Replace this with your actual processing logic
                console.log(`Form submission received: Name - ${name}, Email - ${email}, Address - ${address}`);

                // Send the "Thank you" HTML page as the response
                res.setHeader('Content-Type', 'text/html');
                res.status(200).send(thankYouHtml);
            });
        } catch (error) {
            console.error('Error handling form submission:', error);
            return res.status(500).send('Error handling form submission');
        }
    } else {
        // Handle other HTTP methods
        res.status(405).send('Method Not Allowed');
    }
}

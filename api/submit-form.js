// Import necessary modules
import fs from 'fs';
import path from 'path';
import { parse } from 'querystring'; // For parsing form data

// Define your serverless function handler
export default async function handler(req, res) {
  // Construct the path to your HTML file
  const filePath = path.join(__dirname, '../public/submitForm.html');
  
  // Serve the HTML form page for GET requests
  if (req.method === 'GET') {
    try {
      // Read the HTML file asynchronously
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
        }

        // Send the HTML content as the response
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
      });
    } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).send('Internal Server Error');
    }
  } 
  // Handle form submissions for POST requests
  else if (req.method === 'POST') {
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
        // Replace this with your logic
        console.log(`Form submission received: Name - ${name}, Email - ${email}, Address - ${address}`);

        // Redirect to a "Thank You" page or return a success message
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('Form submission successful!');
      });
    } catch (error) {
      console.error('Error handling form submission:', error);
      return res.status(500).send('Error handling form submission');
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}

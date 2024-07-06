// Import necessary modules
import { parse } from 'querystring';

// Define your serverless function handler
export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method === 'POST') {
    let body = '';
    
    // Collect data from the request stream
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    const filePath = path.join(__dirname, '../public/submitForm.html');
    // Parse the collected data when the request ends
    req.on('end', () => {
      const parsedBody = parse(body);
      return res.sendFile(filePath);
    });
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}

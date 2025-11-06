// server/proxy.js
const express = require('express');
const fetch = require('node-fetch'); // You might need to install node-fetch: npm install node-fetch
const cors = require('cors'); // You might need to install cors: npm install cors
require('dotenv').config(); // To load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3001; // Or your preferred backend port

app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // To parse JSON request bodies

app.post('/api/search-vendors', async (req, res) => {
  // Add this log to confirm the correct route is being hit.
  console.log(`[${new Date().toISOString()}] Received POST request on /api/search-vendors`);

  try {
    const serperApiKey = process.env.SERPER_API_KEY; // Access your Serper API key from backend .env
    if (!serperApiKey) {
      return res.status(500).json({ error: 'Serper API key is not configured on the server.' });
    }

    // Add a check and log for the request body to ensure it's being parsed.
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Error: Request body is empty or not parsed. Ensure express.json() is working.');
      return res.status(400).json({ error: 'Bad Request: Missing request body.' });
    }

    const { q, location, type, num } = req.body;
    const requestBody = { q, location, type, num };

    // Log the body being sent to Serper for debugging
    console.log('Forwarding request to Serper with body:', JSON.stringify(requestBody, null, 2));

    const serperResponse = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': serperApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await serperResponse.json();

    // Check if the response from Serper was successful
    if (!serperResponse.ok) {
      console.error(`Serper API responded with status: ${serperResponse.status}`, data);
      return res.status(serperResponse.status).json({ error: data.message || 'An error occurred with the search provider.' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Serper API.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
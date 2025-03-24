const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// Replace with your API key or use an environment variable
require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const prompt = `You are a financial advisor. Provide helpful advice based on the user's message.\n\nUser: ${message}\nAdvisor:`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const advice = response.data.candidates[0].content.parts[0].text;
    res.json({ advice });
  } catch (error) {
    console.error('Error with Google AI Studio API:', error);
    res.status(500).json({ error: 'Failed to get advice' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
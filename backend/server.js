const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

let conversationHistory = '';

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  conversationHistory += `\nUser: ${message}\nAdvisor:`;
  const prompt = `You are a financial advisor. Provide helpful advice based on the conversation.\n\n${conversationHistory}`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.1',
      prompt: prompt,
      stream: false
    });
    const advice = response.data.response;
    conversationHistory += ` ${advice}`;
    res.json({ advice });
  } catch (error) {
    console.error('Error with LLaMA API:', error);
    res.status(500).json({ error: 'Failed to get advice' });
  }
});

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://fachatbotbe-env.eba-ymnr528r.us-east-1.elasticbeanstalk.com/', { message: input });
      setResponse(res.data.advice);
      setInput('');
    } catch (error) {
      setResponse('Error: Could not get advice.');
    }
  };

  return (
    <div className="App">
      <h1>Financial Advisor Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for financial advice..."
        />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;
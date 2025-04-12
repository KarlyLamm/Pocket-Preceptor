// src/openaiService.js

import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Use the environment variable for the API key
  },
});

export const getOpenAIResponse = async (prompt) => {
  const response = await openai.post('/completions', {
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens: 100,
  });
  return response.data;
};

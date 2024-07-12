// import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();
const { GoogleGenerativeAI  } = require('@google/generative-ai');

const API_KEY = process.env.API_KEY;

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateMail(text) {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//   const prompt = "When was the first smart phone was launched."

  const result = await model.generateContent(text);
  const response = result.response;
  const text = response.text();
//   console.log(text)
  return text;
}

generateMail();
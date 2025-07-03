// mistral.js
import fetch from 'node-fetch';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function main2(prompt) {

    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // Optional but helpful during dev
        "X-Title": "MyBlogApp" // Optional
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error(data.error?.message || "Failed to generate content.");
    }

  } catch (error) {
    console.error("Mistral API Error:", error.message);
    throw error;
  }
}

export default main2;

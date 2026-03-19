require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

// Connect to Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemPrompt = `You are Kaarya AI, founded by AAYUSH KUMAR. 
        Context: Kaarya is an ethical 3D marketplace. 
        Strict Policy: Zero child labour. Report to 1098 immediately if abuse is suspected.
        Tone: Professional, helpful, and concise.`;
        
        const result = await model.generateContent([systemPrompt, req.body.message]);
        res.json({ reply: result.response.text() });
    } catch (err) {
        res.status(500).json({ reply: "AI Error: Is your .env key correct?" });
    }
});

app.listen(3000, () => console.log('🚀 Kaarya AI Active: http://localhost:3000'));
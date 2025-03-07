require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_URL = "https://api.fireworks.ai/inference/v1/chat/completions";
const API_KEY = process.env.FIREWORKS_API_KEY; // Store in .env file

app.post("/analyze", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post(
            API_URL,
            {
                model: "accounts/sentientfoundation/models/dobby-unhinged-llama-3-3-70b-new",
                max_tokens: 1024,
                temperature: 0.6,
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching AI response" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));

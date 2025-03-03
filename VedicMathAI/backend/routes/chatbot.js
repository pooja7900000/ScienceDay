const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
            {
                prompt: message
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${GEMINI_API_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
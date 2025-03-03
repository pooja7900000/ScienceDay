mkdir VedicMathAI && cd VedicMathAI
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors openai whisper-node


// 📌 Step 2: Setup server.js



const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const sutraRoutes = require("./routes/sutraRoutes");
const aiRoutes = require("./routes/aiRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

app.use("/api/sutras", sutraRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// 📌 Step 3: AI Chatbot with Text & Voice (routes/aiRoutes.js)

const express = require("express");
const axios = require("axios");
const whisper = require("whisper-node"); // Whisper API for speech-to-text
const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message, voiceData } = req.body;
    try {
        let userMessage = message;

        if (voiceData) {
            const text = await whisper.transcribe(voiceData);
            userMessage = text;
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            { model: "gpt-4", messages: [{ role: "user", content: userMessage }] },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" } }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "AI Chatbot error" });
    }
});

module.exports = router;


// 📌 Step 4: Leaderboard (routes/leaderboardRoutes.js)

const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ points: -1 }).limit(10);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: "Leaderboard error" });
    }
});

module.exports = router;


// 🔥 2. Frontend (React.js + Next.js)

// 📌 Step 1: Setup Frontend

cd 
npx create-next-app frontend
cd frontend
npm install axios styled-components


// 📌 Step 2: AI Chatbot Page (pages/ai-chat.js)

import { useState } from "react";
import axios from "axios";

const AIChat = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [audio, setAudio] = useState(null);

    const sendMessage = async () => {
        const res = await axios.post("http://localhost:5000/api/ai/chat", { message, voiceData: audio });
        setResponse(res.data.reply);
    };

    return (
        <div>
            <h2>Ask AI</h2>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Ask</button>
            <p>AI: {response}</p>
        </div>
    );
};

export default AIChat;



// 📌 Step 3: Leaderboard Page (pages/leaderboard.js)

import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/leaderboard")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            {users.map((user, index) => (
                <p key={index}>{user.name}: {user.points} pts</p>
            ))}
        </div>
    );
};

export default Leaderboard;


// 📌 Step 4: Dark Mode & Custom Themes (utils/theme.js)

export const darkTheme = {
    background: "#1a1a1a",
    text: "#ffffff",
};

export const lightTheme = {
    background: "#ffffff",
    text: "#000000",
};


// 📌 Step 5: Apply Dark Mode (components/ThemeToggle.js)

import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/theme";

const ThemeToggle = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
            {children}
        </ThemeProvider>
    );
};

export default ThemeToggle;



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Dummy API route
// app.get("/", (req, res) => {
//     res.send("Vedic Mathematics AI Backend is Running!");
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/quiz", require("./routes/quiz"));
// app.use("/api/chat", require("./routes/chatbot"));
// app.use("/api/leaderboard", require("./routes/leaderboard"));

// app.listen(5000, () => console.log("Server running on port 5000"));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/chat", require("./routes/chatbot"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/vedicmaths", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log("Backend running on port 5000"));

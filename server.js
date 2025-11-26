const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const moodsRoutes = require("./routes/moodsRoutes");
const meditationRoutes = require("./routes/meditationRoutes");
const chatRoutes = require('./routes/chatRoutes.js')




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Mental Health Companion Backend is running 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/moods", moodsRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/chat", chatRoutes);



// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

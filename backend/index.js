require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./schemas/Task'); // Import Task schema

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// **GET Endpoint - Fetch all tasks**
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from MongoDB
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// **POST Endpoint - Create new task**
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const newTask = new Task({ title, description });
        await newTask.save();
        
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
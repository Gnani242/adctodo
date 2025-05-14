import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Task from "./models/tasks.js"; // ✅ Use capitalized model name

const app = express();

app.use(bodyParser.json());
app.use(cors());

// POST data
app.post("/api/addtask", async (req, res) => {
  const { task, status, deadline } = req.body;

  const newTask = new Task({ task, status, deadline });

  try {
    await newTask.save();
    return res.status(200).json({ message: "Task added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error saving task." });
  }
});

// GET all tasks
app.get("/api/getTask", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found." });
    }
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching tasks." });
  }
});

// DELETE task
app.delete("/api/deletetask/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(400).json({ message: "Unable to delete task." });
    }
    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting task." });
  }
});

// GET single task by ID
app.get("/api/get_task_data/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const taskData = await Task.findById(id);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json({ task: taskData });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching task." });
  }
});

// PUT update task
app.put("/api/edit_task/:id", async (req, res) => {
  const id = req.params.id;
  const { task, status, deadline } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, status, deadline },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(400).json({ message: "Unable to update the task." });
    }
    return res.status(200).json({ task: updatedTask });
  } catch (err) {
    return res.status(500).json({ message: "Error updating task." });
  }
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://gnaneswararaoenugutala789:Aditya123@cluster0.c2xrzw3.mongodb.net/tasksDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB connection error:", err));

export default app; // ✅ Required for deployment platforms like Vercel

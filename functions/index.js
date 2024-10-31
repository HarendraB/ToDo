// Import required modules
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.database();

// Initialize Express app
const app = express();
app.use(cors({ origin: true }));

// API endpoint to add a task
app.post("/addTask", async (req, res) => {
  const taskText = req.body.text;
  if (!taskText) return res.status(400).send("Task text is required");

  try {
    await db.ref("tasks").push({ text: taskText, timestamp: Date.now() });
    res.status(201).send("Task added successfully");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Failed to add task");
  }
});

// API endpoint to get all tasks
app.get("/getTasks", async (req, res) => {
  try {
    const snapshot = await db.ref("tasks").once("value");
    const tasks = snapshot.val();
    res.status(200).json(tasks || {});
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).send("Failed to load tasks");
  }
});

// API endpoint to delete a task
app.delete("/deleteTask/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await db.ref(`tasks/${taskId}`).remove();
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Failed to delete task");
  }
});

// Export the API
exports.api = functions.https.onRequest(app);

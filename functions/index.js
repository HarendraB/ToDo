const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.database();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Add Task
app.post("/addTask", async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const ref = db.ref("tasks").push();
  await ref.set({ task });
  res.json({ id: ref.key, task });
});

// Delete Task
app.post("/deleteTask", async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  await db.ref("tasks/" + taskId).remove();
  res.json({ message: "Task deleted" });
});

// Get Tasks
app.get("/getTasks", async (req, res) => {
  const snapshot = await db.ref("tasks").once("value");
  const tasks = [];

  snapshot.forEach((childSnapshot) => {
    tasks.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  res.json(tasks);
});

exports.api = functions.https.onRequest(app);

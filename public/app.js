async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value;

  if (task) {
    try {
      const response = await fetch("/addTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });
      await response.json();
      taskInput.value = "";
      loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
}

async function deleteTask(taskId) {
  try {
    await fetch("/deleteTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId })
    });
    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  try {
    const response = await fetch("/getTasks");
    const tasks = await response.json();

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `${task.task} <button onclick="deleteTask('${task.id}')">Delete</button>`;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

window.onload = loadTasks;

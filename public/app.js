const apiBaseURL = "https://us-central1-trialprojectbackend.cloudfunctions.net/api"; // Your base URL

export async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    try {
      const response = await fetch(`${apiBaseURL}/addTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText })
      });
      if (response.ok) {
        taskInput.value = "";  // Clear input after adding
        loadTasks();  // Refresh task list
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  } else {
    alert("Please enter a task.");
  }
}

export async function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";  // Clear task list

  try {
    const response = await fetch(`${apiBaseURL}/getTasks`);
    if (response.ok) {
      const tasks = await response.json();
      for (const [taskId, task] of Object.entries(tasks)) {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;

        // Create delete button for each task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = async () => {
          await deleteTask(taskId);
          loadTasks();  // Refresh task list
        };

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      }
    } else {
      console.error("Error fetching tasks:", response.status);
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Ensure deleteTask is defined elsewhere, or define it if not
export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${apiBaseURL}/deleteTask/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

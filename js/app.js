function openTasks() {
  document.getElementById("home").style.display = "none";
  document.querySelector(".team").style.display = "none";
  document.getElementById("tasks").style.display = "block";
  renderTasks();
  showRecommendation();
}

function addTask() {
  const text = taskText.value.trim();
  if (!text) return;

  taskData.push({
    text,
    type: taskType.value,
    deadline: taskDeadline.value,
    effort: taskEffort.value,
    completed: false
  });

  taskText.value = "";
  saveTasks();
  renderTasks();
  showRecommendation();
}

function deleteTask(i) {
  taskData.splice(i, 1);
  saveTasks();
  renderTasks();
  showRecommendation();
}

function toggleComplete(i) {
  taskData[i].completed = !taskData[i].completed;
  saveTasks();
  renderTasks();
  showRecommendation();
}

function renderTasks() {
  taskList.innerHTML = "";

  taskData.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = `task ${t.type} ${t.completed ? "completed" : ""} ${isUrgent(t.deadline) ? "urgent" : ""}`;

    div.innerHTML = `
      <div>
        <input type="checkbox" ${t.completed ? "checked" : ""} onclick="toggleComplete(${i})">
        <b>${t.text}</b><br>
        <small>Type: ${t.type} | Deadline: ${t.deadline || "none"} | Effort: ${t.effort}</small>
      </div>
      <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
    `;

    taskList.appendChild(div);
  });
}

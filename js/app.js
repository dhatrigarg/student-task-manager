function openTasks() {
  const home = document.getElementById("home");
  const tasks = document.getElementById("tasks");

  if (home) home.style.display = "none";
  if (tasks) tasks.style.display = "block";

  if (typeof renderTasks === "function") renderTasks();
  if (typeof showRecommendation === "function") showRecommendation();
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

// Dynamic task heading
const motivationalLines = [
  "Stay on track, every day.",
  "Decide less. Do more.",
  "Stay ahead of deadlines.",
  "Focus on what matters."
];

const dynamicHeading = document.getElementById("dynamicHeading");

function changeHeading() {
  const randomIndex = Math.floor(Math.random() * motivationalLines.length);
  dynamicHeading.textContent = motivationalLines[randomIndex];
}

// Change heading every 5 seconds
setInterval(changeHeading, 5000);

// Initialize first random line immediately
changeHeading();

function goHome() {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("home").style.display = "flex"; // Show hero section
}

function openTasks() {
  const home = document.getElementById("home");
  const tasks = document.getElementById("tasks");

  if (home) home.style.display = "none";
  if (tasks) tasks.style.display = "block";

  if (typeof renderTasks === "function") renderTasks();
  if (typeof showRecommendation === "function") showRecommendation();
  calculateProductivityScore();

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
  calculateProductivityScore();

}

function deleteTask(i) {
  taskData.splice(i, 1);
  saveTasks();
  renderTasks();
  showRecommendation();
  calculateProductivityScore();

}

function toggleComplete(i) {
  taskData[i].completed = !taskData[i].completed;
  saveTasks();
  renderTasks();
  showRecommendation();
  calculateProductivityScore();

}
function renderTasks() {
  taskList.innerHTML = "";

  // Create a copy of taskData with original index
  const sortedTasks = taskData
    .map((task, index) => ({ task, index }))
    .sort((a, b) => calculatePriority(b.task) - calculatePriority(a.task));

  sortedTasks.forEach((item, displayIndex) => {
    const t = item.task;
    const originalIndex = item.index;

    const div = document.createElement("div");
    div.className = `task ${t.type} ${t.completed ? "completed" : ""} ${getUrgency(t.deadline)}`;

    div.innerHTML = `
      <div>
        <input type="checkbox" ${t.completed ? "checked" : ""} 
          onclick="toggleComplete(${originalIndex})">

        <b>${displayIndex + 1}. ${t.text}</b><br>

        <small>
          Type: ${t.type} | 
          Deadline: ${t.deadline || "none"} | 
          Effort: ${t.effort}
        </small>
      </div>

      <button class="delete-btn" onclick="deleteTask(${originalIndex})">
        Delete
      </button>
    `;

    taskList.appendChild(div);
  });
}

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



function openFocus() {
  window.location.href = "focus.html";
}

function calculateProductivityScore() {
  if (taskData.length === 0) {
    updateProductivityCircle(0); // show 0% when no tasks
    return 0;
  }

  let totalPriority = 0;
  let completedPriority = 0;

  taskData.forEach(task => {
    const priority = calculatePriority(task); // Use your existing priority function
    totalPriority += priority;
    if (task.completed) completedPriority += priority;
  });

  // Calculate score based on priority ratio
  let score = Math.round((completedPriority / totalPriority) * 100);

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Update the circle
  updateProductivityCircle(score);

  // Optional: also update numeric value in case you still want it outside
  const scoreValue = document.getElementById("scoreValue");
  if (scoreValue) scoreValue.textContent = score;

  return score;
}

// Function to update the red progress circle
function updateProductivityCircle(score) {
  score = Math.max(0, Math.min(100, score));

  const circle = document.getElementById("progressCircle");
  const text = document.getElementById("circlePercent");

  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  // Animate the stroke
  circle.style.transition = "stroke-dashoffset 0.6s ease";
  circle.style.strokeDasharray = circumference;
  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  // Update percent text inside circle
  text.textContent = `${score}%`;
}



function updateProductivityCircle(score) {
  score = Math.max(0, Math.min(100, score));

  const circle = document.getElementById("progressCircle");
  const text = document.getElementById("circlePercent");

  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  text.textContent = `${score}%`;
}



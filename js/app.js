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
     <div class="task-actions">
        <button class="focus-btn" onclick="openFocus(${originalIndex})">
          Focus
        </button>

        <button class="delete-btn" onclick="deleteTask(${originalIndex})">
          Delete
        </button>
      </div>
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
  if (!dynamicHeading) return; 

  const randomIndex = Math.floor(Math.random() * motivationalLines.length);
  dynamicHeading.textContent = motivationalLines[randomIndex];
}
if (dynamicHeading) {
  setInterval(changeHeading, 5000);
  changeHeading();
}

function goHome() {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("home").style.display = "flex"; 
}



function openFocus() {
  window.location.href = "focus.html";
}

function calculateProductivityScore() {
  if (taskData.length === 0) {
    updateProductivityCircle(0); 
    return 0;
  }

  let totalPriority = 0;
  let completedPriority = 0;

  taskData.forEach(task => {
    const priority = calculatePriority(task); 
    totalPriority += priority;
    if (task.completed) completedPriority += priority;
  });

  
  let score = Math.round((completedPriority / totalPriority) * 100);

  
  score = Math.max(0, Math.min(100, score));

  
  updateProductivityCircle(score);
  

  
  const scoreValue = document.getElementById("scoreValue");
  if (scoreValue) scoreValue.textContent = score;
  updateProductivityMessage(score);

  return score;
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

function openFocus(i) {
  
  localStorage.setItem("focusedTask", JSON.stringify(taskData[i]));

 
  window.location.href = "focus.html";
}

document.addEventListener("DOMContentLoaded", () => {
  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  }
});


function toggleTheme() {
  const toggle = document.querySelector(".theme-toggle");
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    if (toggle) toggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    if (toggle) toggle.textContent = "🌙";
  }
}

function updateProductivityMessage(score) {
  const msg = document.getElementById("productivityMessage");
  if (!msg) return;

  if (score === 0) {
    msg.textContent = "Let’s get started 🚀";
  } else if (score <= 10) {
    msg.textContent = "Good start! Keep going 👍";
  } else if (score <= 30) {
    msg.textContent = "Nice progress, stay focused 💡";
  } else if (score <= 50) {
    msg.textContent = "You’re building momentum 🔥";
  } else if (score <= 70) {
    msg.textContent = "Great work! Don’t slow down 💪";
  } else if (score <= 90) {
    msg.textContent = "Almost there! Push a little more 🚀";
  } else {
    msg.textContent = "Excellent! You’re on top of your goals 🎯";
  }
}

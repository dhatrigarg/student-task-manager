console.log("focus.js loaded ✅");

let interval = null;
let totalSeconds = 0;
let isPaused = false;

const timeEl = document.getElementById("time");
const statusEl = document.getElementById("status");
const sound = document.getElementById("sound");

const minutesInput = document.getElementById("minutes");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateDisplay() {
  timeEl.textContent = formatTime(totalSeconds);
}

function startInterval() {
  
  if (interval) return;

  interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      interval = null;

      statusEl.textContent = "✅ Completed!";
      pauseBtn.disabled = true;

      sound.currentTime = 0;
      sound.play().catch(() => {});
      return;
    }

    totalSeconds--;
    updateDisplay();
  }, 1000);
}

startBtn.addEventListener("click", () => {
  const mins = Number(minutesInput.value);

  if (!mins || mins <= 0) {
    alert("Enter minutes first!");
    return;
  }

  totalSeconds = mins * 60;
  updateDisplay();

  statusEl.textContent = "🔥 Focusing...";
  isPaused = false;

  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  pauseBtn.textContent = "Pause";

  
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  startInterval();
});

pauseBtn.addEventListener("click", () => {
  if (!interval && totalSeconds === 0) return;

  if (!isPaused) {
    
    isPaused = true;
    statusEl.textContent = "⏸ Paused";
    pauseBtn.textContent = "Resume";

    clearInterval(interval);
    interval = null; 
  } else {
    
    isPaused = false;
    statusEl.textContent = "🔥 Focusing...";
    pauseBtn.textContent = "Pause";

    startInterval();
  }
});

resetBtn.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  totalSeconds = 0;
  isPaused = false;
  updateDisplay();

  statusEl.textContent = "Ready to focus";
  pauseBtn.textContent = "Pause";

  pauseBtn.disabled = true;
  resetBtn.disabled = true;
});
const focusedTask = JSON.parse(localStorage.getItem("focusedTask"));

if (focusedTask) {
  console.log("Focused Task:", focusedTask);
  
}




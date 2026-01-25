function calculatePriority(task) {
  let score = task.type === "study" ? 50 : 10;

  if (task.deadline) {
    const today = new Date();
    const due = new Date(task.deadline);
    today.setHours(0,0,0,0);
    due.setHours(0,0,0,0);
    const diff = (due - today) / 86400000;
    score += diff <= 1 ? 30 : 10;
  }

  score += task.effort === "low" ? 20 :
           task.effort === "medium" ? 10 : 5;

  return score;
}


function showRecommendation() {
  const box = document.getElementById("aiResult");

  // CASE 1: No tasks added at all
  if (taskData.length === 0) {
    box.innerHTML = "🌱 Great, let’s start! Add your first task to begin.";
    return;
  }

  // Active (not completed) tasks
  const activeTasks = taskData.filter(t => !t.completed);

  // CASE 2: All tasks completed
  if (activeTasks.length === 0) {
    box.innerHTML = "🎉 All tasks completed. Great job!";
    return;
  }

  // CASE 3: Recommend highest priority task
  let bestTask = activeTasks[0];
  let bestScore = calculatePriority(bestTask);

  for (let task of activeTasks) {
    const score = calculatePriority(task);
    if (score > bestScore) {
      bestScore = score;
      bestTask = task;
    }
  }

  box.innerHTML = `
    <b>🤖 Recommended Task:</b> "${bestTask.text}"<br><br>
    <b>Why?</b>
    <ul>
      <li>Task type: ${bestTask.type}</li>
      <li>Deadline considered</li>
      <li>Effort level: ${bestTask.effort}</li>
    </ul>
  `;
}

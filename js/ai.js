// function calculatePriority(task) {
//   let score = task.type === "study" ? 50 : 10;

//   if (task.deadline) {
//     const today = new Date();
//     const due = new Date(task.deadline);
//     today.setHours(0,0,0,0);
//     due.setHours(0,0,0,0);
//     const diff = (due - today) / 86400000;
//     score += diff <= 1 ? 30 : 10;
//   }

//   score += task.effort === "low" ? 20 :
//            task.effort === "medium" ? 10 : 5;

//   return score;
// }

function calculatePriority(task) {
  let score = task.type === "study" ? 50 : 20;

  const urgency = getUrgency(task.deadline);

  if (urgency === "urgent") score += 40;
  else if (urgency === "soon") score += 25;
  else if (urgency === "safe") score += 10;

  if (task.effort === "low") score += 20;
  else if (task.effort === "medium") score += 10;
  else score += 5;

  return score;
}


function showRecommendation() {
  const box = document.getElementById("aiResult");
  const active = taskData.filter(t => !t.completed);

  if (active.length === 0) {
    box.innerHTML = "🤖 All tasks completed. Great job!";
    return;
  }

  let best = active[0];
  let bestScore = calculatePriority(best);

  for (let t of active) {
    const s = calculatePriority(t);
    if (s > bestScore) {
      bestScore = s;
      best = t;
    }
  }

  let reasons = [];
  if (best.type === "study") reasons.push("It is study-related");
  if (best.deadline) reasons.push("Deadline is close");
  reasons.push(`Effort level is ${best.effort}`);

  box.innerHTML = `
    <b>🤖 Recommended Task:</b> "${best.text}"<br><br>
    <b>Why?</b>
    <ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
}

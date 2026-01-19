let taskData = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskData));
}

function isUrgent(deadline) {
  if (!deadline) return false;
  const today = new Date();
  const due = new Date(deadline);
  today.setHours(0,0,0,0);
  due.setHours(0,0,0,0);
  return (due - today) / 86400000 <= 1;
}

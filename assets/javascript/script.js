const taskText = document.getElementById("task-text");
const descText = document.getElementById("desc-text");
const monthInput = document.getElementById("month-input");
const dayInput = document.getElementById("day-input");
const submitButton = document.getElementById("submit-button");
const saveData = JSON.parse(localStorage.getItem("Saves")) ?? [];

const userData = {
  title: taskText.value,
  description: descText.value,
  month: monthInput.value,
  day: dayInput.value,
};

const saveDate = (e) => {
  e.preventDefault();
  const data = JSON.stringify({ ...userData });
  saveData.push(data);
  localStorage.setItem("Saves", saveData);
};

submitButton.addEventListener("click", saveDate);

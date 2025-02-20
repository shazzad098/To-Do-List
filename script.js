const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskBtn");

// Create new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
    taskInput.value = "";
  } else {
    alert("Please enter a task");
  }
});

//complete task
taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
  }
});

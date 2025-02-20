const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskBtn");

// Create new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-2 bg-gray-800 rounded";
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div>
        <button class="edit-btn px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2 cursor-pointer">
          <i class="fa-solid fa-file-pen"></i>
        </button>
        <button class="delete-btn px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
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

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskBtn");

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToList(taskText);
    taskInput.value = "";
  } else {
    alert("Please enter a task");
  }
});

function addTaskToList(taskText) {
  const li = document.createElement("li");
  li.className =
    "task-item flex items-center justify-between p-2 bg-gray-800 rounded";
  li.innerHTML = `
    <div class="flex items-center">
      <input type="checkbox" class="task-checkbox rounded-full mr-2 h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer hover:ring-2 hover:ring-blue-400" />
      <span class="task-text">${taskText}</span>
    </div>
    <div>
      <button class="edit-btn stylish-btn px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2 cursor-pointer">
        <i class="fa-solid fa-file-pen"></i>
      </button>
      <button class="delete-btn stylish-btn px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;
  taskList.appendChild(li);
}

taskList.addEventListener("click", (event) => {
  const target = event.target;
  const li = target.closest(".task-item");

  if (!li) return;

  if (
    target.classList.contains("delete-btn") ||
    target.closest(".delete-btn")
  ) {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
    }
  } else if (
    target.classList.contains("edit-btn") ||
    target.closest(".edit-btn")
  ) {
    editTask(li);
  } else if (target.classList.contains("task-checkbox")) {
    toggleTaskComplete(li, target);
  }
});

function editTask(li) {
  const taskTextElement = li.querySelector(".task-text");
  const currentText = taskTextElement.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "w-full px-2 py-1 rounded border border-gray-300";

  taskTextElement.textContent = "";
  taskTextElement.appendChild(input);
  input.focus();

  input.addEventListener("blur", () => {
    updateTaskText(taskTextElement, input.value.trim(), currentText);
  });

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });
}

function updateTaskText(taskTextElement, newText, oldText) {
  if (newText) {
    taskTextElement.textContent = newText;
  } else {
    taskTextElement.textContent = oldText;
  }
}

function toggleTaskComplete(li, checkbox) {
  const taskTextElement = li.querySelector(".task-text");
  if (checkbox.checked) {
    taskTextElement.classList.add("completed");
    taskTextElement.style.textDecoration = "line-through overline";
  } else {
    taskTextElement.classList.remove("completed");
    taskTextElement.style.textDecoration = "none";
  }
}
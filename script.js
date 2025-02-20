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
  li.className = "flex items-center justify-between p-2 bg-gray-800 rounded";
  li.innerHTML = 
  `
    <span class="task-text">${taskText}</span>
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
  const isIcon = target.tagName === "I";
  const button = isIcon ? target.parentElement : target;
  const li = target.closest("li");

  if (!li) return;

  if (button.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
    }
  } else if (button.classList.contains("edit-btn")) {
    editTask(li);
  } else if (
    target.classList.contains("task-text") ||
    target === li.firstChild
  ) {
    li.classList.toggle("completed");
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

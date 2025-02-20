const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskBtn");
const themeToggleBtn = document.getElementById("theme-toggle");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");
const htmlTag = document.getElementById("htmltag");

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
    "task-item flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
  li.innerHTML = `
          <div class="flex items-center">
            <div class="relative mr-2">
                <input type="checkbox" class="task-checkbox opacity-0 absolute top-0 left-0 w-5 h-5 cursor-pointer appearance-none -webkit-appearance-none -moz-appearance-none" />
                <div class="custom-checkbox border rounded-full w-5 h-5 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 flex items-center justify-center transition-all duration-200 ease-in-out hover:ring-2 hover:ring-blue-400">
                    <svg class="check-icon hidden w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                </div>
            </div>
            <span class="task-text text-gray-800 dark:text-white">${taskText}</span>
          </div>
          <div>
            <button class="edit-btn stylish-btn px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2 cursor-pointer font-semibold">
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="delete-btn stylish-btn px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer font-semibold">
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
  input.className =
    "w-full px-4 py-2 rounded-md border bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white";

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
  const customCheckbox = li.querySelector(".custom-checkbox");
  const checkIcon = li.querySelector(".check-icon");

  if (checkbox.checked) {
    taskTextElement.classList.add("line-through", "text-gray-500", "dark:text-gray-400");
    customCheckbox.classList.add("bg-blue-500", "border-blue-500");
    checkIcon.classList.remove("hidden");
  } else {
    taskTextElement.classList.remove("line-through", "text-gray-500", "dark:text-gray-400");
    customCheckbox.classList.remove("bg-blue-500", "border-blue-500");
    customCheckbox.classList.add("bg-white", "dark:bg-gray-900", "border-gray-300", "dark:border-gray-500"); // Revert background and border
    checkIcon.classList.add("hidden");
  }
}

// Dark mode toggle functionality
themeToggleBtn.addEventListener("click", () => {
  htmlTag.classList.toggle("dark");
  // Toggle icon visibility based on dark mode
  if (htmlTag.classList.contains("dark")) {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    themeToggleBtn.setAttribute("aria-pressed", "true"); // Dark mode is ON
  } else {
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    themeToggleBtn.setAttribute("aria-pressed", "false"); // Light mode is ON
  }
});
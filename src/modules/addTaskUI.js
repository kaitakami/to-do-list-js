import { nanoid } from "nanoid";
import {
  deleteTask,
  getUserData,
  changeCheckedStatus,
  tasks,
} from "./addTaskLogic";

const addTaskModal = document.getElementById("add-task-modal");
const addTaskButton = document.getElementById("add-task-button");
const removeTaskModalButton = document.getElementById(
  "remove-task-modal-button"
);
const submitTaskButton = document.getElementById("submit-task-button");
const newTaskName = document.querySelector(".input-new-task-name");
const newTaskDate = document.querySelector(".input-new-task-date");
const tasksRenderBox = document.getElementById("tasks-render-box");

addTaskButton.addEventListener("click", () => toggleModalClasses());

removeTaskModalButton.addEventListener("click", () => toggleModalClasses());

const toggleModalClasses = () => {
  addTaskModal.classList.toggle("flex");
  addTaskModal.classList.toggle("hidden");
  newTaskName.value = "";
  newTaskDate.value = "";
};

submitTaskButton.addEventListener("click", (e) => addTask(e));

const addTask = (e) => {
  if (newTaskName.value.length) {
    e.preventDefault();
    const newTaskData = {
      name: newTaskName.value[0].toUpperCase() + newTaskName.value.substring(1),
      date: newTaskDate.value ? newTaskDate.value : "Not defined",
      group: {
        name: undefined,
        color: undefined,
      },
      id: nanoid(),
    };
    getUserData(newTaskData);
    toggleModalClasses();
    renderTasks();
  }
};

const deleteTaskModal = document.querySelector(".delete-task-modal");
const deleteTaskConfirmationButton = document.querySelector(
  ".delete-task-confirmation"
);
const goBackButton = document.querySelector(".confirmation-go-back-button");

let waitingConfirmationTaskId = "";
deleteTaskConfirmationButton.addEventListener("click", () => {
  deleteTask(waitingConfirmationTaskId);
  waitingConfirmationTaskId = "";
  // After modifying the tasks array re-render again
  renderTasks();
  toggleDeleteTaskModal();
});

goBackButton.addEventListener("click", () => {
  waitingConfirmationTaskId = "";
  toggleDeleteTaskModal();
});

const toggleDeleteTaskModal = () => {
  deleteTaskModal.classList.toggle("hidden");
  deleteTaskModal.classList.toggle("flex");
};

const renderTasks = () => {
  tasksRenderBox.innerHTML = ``;
  tasks.forEach((task) => {
    tasksRenderBox.innerHTML += `
      <div class="task">
      <div class="flex items-center gap-3 w-full">
      <div class="done-button ${task.id}">
      <div class="task-circle flex justify-center ${
        task.checked ? "hidden" : ""
      }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" viewBox="0 0 24 24" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path></svg>
      </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-10 h-10 ${
            task.checked ? "" : "hidden"
          }">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="md:flex justify-between w-full">
          <div class="text-white text-lg">${task.name}</div>
          <div class="flex items-center gap-4">
            <div class="hidden md:block group-color w-8 h-8 rounded-full ${
              task.group.color
            }"></div>
            <p class="text-gray-light">${task.date}</p>
          </div>
        </div>
        <div class="delete-task-button  ${task.id}">
          <!-- Delete button -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8 hover:scale-105 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
  `;
  });

  // Add done functionality
  const taskDoneButton = document.querySelectorAll(".done-button");

  taskDoneButton.forEach((button) =>
    button.addEventListener("click", () => {
      changeCheckedStatus(button.classList[1]);
      renderTasks();
    })
  );

  // Add functionality to delete button
  const deleteTaskButtons = document.querySelectorAll(".delete-task-button");

  deleteTaskButtons.forEach((button) =>
    button.addEventListener("click", () => {
      waitingConfirmationTaskId = button.classList[1];
      toggleDeleteTaskModal();
    })
  );
};

renderTasks();

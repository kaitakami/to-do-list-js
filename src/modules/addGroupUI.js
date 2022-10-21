import { nanoid } from "nanoid";
import {
  groups,
  getNewGroupData,
  newGroupSelected,
  deleteGroup,
} from "./addGroupLogic";

const addGroupButton = document.getElementById("add-group-button");
const addGroupModal = document.getElementById("add-group-modal");
const goBackButton = document.getElementById("remove-group-modal-button");
const submitGroupButton = document.getElementById("submit-group-button");
const newGroupNameInput = document.querySelector(".input-new-group-name");
const newGroupColorInput = document.querySelector(".input-new-group-color");
const groupsRenderBox = document.querySelector(".groups-render-box");
const allTasksButton = document.querySelector(".all-tasks-selector");
const todayTasksButton = document.querySelector(".today-tasks-selector");

allTasksButton.addEventListener("click", () => {
  newGroupSelected("all");
  renderGroups();
});

todayTasksButton.addEventListener("click", () => {
  newGroupSelected("today");
  renderGroups();
});

const toggleModalClasses = () => {
  addGroupModal.classList.toggle("hidden");
  addGroupModal.classList.toggle("flex");
};

addGroupButton.addEventListener("click", () => {
  toggleModalClasses();
});

goBackButton.addEventListener("click", () => {
  newGroupColorInput.value = "";
  newGroupNameInput.value = "";
  toggleModalClasses();
});

submitGroupButton.addEventListener("click", (e) => submitGroup(e));

const submitGroup = (e) => {
  if (newGroupNameInput.value) {
    e.preventDefault();
    const newGroupData = {
      name: newGroupNameInput.value,
      color: newGroupColorInput.value,
      id: nanoid(),
      selected: false,
      tasks: 0,
      completedTasks: 0,
    };
    getNewGroupData(newGroupData);
    newGroupColorInput.value = "";
    newGroupNameInput.value = "";
    toggleModalClasses();
  }
  renderGroups();
};

const renderGroups = () => {
  groupsRenderBox.innerHTML = "";
  groups.forEach((group) => {
    groupsRenderBox.innerHTML += `
      <div
      class="task-group ${group.id} ${
      group.selected ? "bg-dark" : "bg-gray-dark"
    }  rounded-2xl flex flex-col gap-2 items-center justify-center p-4 shadow-md sm:shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
      <div class="flex gap-3 items-center">
        <!-- Name and color -->
        <div id="${group.id}" class="group-color w-8 h-8 rounded-full"></div>
        <div class="text-xl font-semibold whitespace-nowrap">${group.name}</div>
      </div>
      </div>
    </div>
    `;
    const groupColorElement = document.getElementById(`${group.id}`);
    groupColorElement.style.backgroundColor = group.color;
  });

  const groupsElements = document.querySelectorAll(".task-group");
  groupsElements.forEach((group) => {
    group.addEventListener("click", () => {
      newGroupSelected(group.classList[1]);
      renderGroups();
    });
  });
};

// Edit group interface
const editGroupsButton = document.querySelectorAll(".edit-groups-button");
const editGroupModal = document.getElementById("edit-group-modal");
const editGroupsBox = document.querySelector(".edit-groups-box");

editGroupsButton.forEach((button) =>
  button.addEventListener("click", () => {
    toggleEditModal();
    renderEditGroups();
  })
);

const toggleEditModal = () => {
  editGroupModal.classList.toggle("hidden");
  editGroupModal.classList.toggle("flex");
};

const renderEditGroups = () => {
  editGroupsBox.innerHTML = groups.length
    ? ""
    : `<div class="text-xl">Start by creating a new group</div>`;
  groups.forEach((group) => {
    editGroupsBox.innerHTML += `
    <div class="edit-group bg-gray-dark p-3 rounded-lg flex gap-3 items-center justify-between">
                <div id="${group.id}" class="w-8 h-8 rounded-full edit-group-color-element"></div>
                <div class="text-lg">${group.name}</div>
                <div class="delete-group-button ${group.id}">
                  <!-- Delete button -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8 hover:scale-105 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
    `;
    const groupColorElement = document.getElementById(group.id);
    groupColorElement.style.backgroundColor = group.color;
  });
  const deleteButtons = document.querySelectorAll(".delete-group-button");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", () => {
      deleteGroup(button.classList[1]);
      renderEditGroups();
      renderGroups();
    })
  );
};

renderGroups();

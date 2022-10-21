let tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

let groupsLocalStorage = JSON.parse(localStorage.getItem("groups"));

let selectedGroupLocalStorage = JSON.parse(localStorage.getItem("selectedGroup"))

const tasksSetLS = (tasksArr) => {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
};

const groupsSetLS = (groupsArr) => {
  localStorage.setItem("groups", JSON.stringify(groupsArr));
};

const selectedGroupSetLS = (selectedGroup) => {
  localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
};


export {
  tasksSetLS,
  tasksLocalStorage,
  groupsSetLS,
  groupsLocalStorage,
  selectedGroupLocalStorage,
  selectedGroupSetLS,
};

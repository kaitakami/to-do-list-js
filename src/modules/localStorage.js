let tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

const tasksSetLS = (tasksArr) => {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
};

export { tasksSetLS, tasksLocalStorage };

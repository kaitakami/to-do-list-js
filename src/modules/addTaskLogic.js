import { tasksSetLS, tasksLocalStorage } from "./localStorage";

let tasks = tasksLocalStorage || [
  {
    name: "You have to create a group to start adding tasks! :)",
    date: new Date().toLocaleDateString(),
    checked: false,
    group: {
      name: undefined,
      color: undefined,
      id: "1",
    },
    id: "1",
  },
];

const getUserData = (newTask) => {
  tasks.push(newTask);
  tasksSetLS(tasks);
};

const deleteTask = (taskId) => {
  const tempTasks = tasks.filter((task) => task.id !== taskId);
  tasks = [...tempTasks];
  tasksSetLS(tasks);
};

const changeCheckedStatus = (taskId) => {
  const tempTasks = tasks.map((task) => {
    if (task.id === taskId) {
      {
        return { ...task, checked: !task.checked };
      }
    } else {
      return task;
    }
  });
  tasks = [...tempTasks];
  tasksSetLS(tasks);
};

export { tasks, getUserData, deleteTask, changeCheckedStatus };

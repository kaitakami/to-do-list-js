const tasks = [
  {
    name: "Start by adding a new Task!",
    date: new Date().toLocaleDateString(),
    group: {
      name: undefined,
      color: undefined,
    },
    id: 1,
  },
];

const getUserData = (newTask) => {
  tasks.push(newTask);
};

export { getUserData, tasks };

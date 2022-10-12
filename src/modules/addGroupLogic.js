let groups = [];
let selectedGroup = {
  name: "all",

}; // by default all tasks area selected

const getNewGroupData = (newGroup) => {
  groups.push(newGroup);
  newGroupSelected(newGroup.id);
};

const newGroupSelected = (groupId) => {
  const tempGroups = groups.map((group) => {
    if (group.id === groupId) {
      selectedGroup = group;
      return {
        ...group,
        selected: true,
      };
    } else {
      return {
        ...group,
        selected: false,
      };
    }
  });
  groups = [...tempGroups];
};

const deleteGroup = (groupId) => {
  const tempGroups = groups.filter((group) => group.id !== groupId);
  console.log(tempGroups);
  groups = [...tempGroups];
};

export {
  groups,
  getNewGroupData,
  newGroupSelected,
  deleteGroup,
  selectedGroup,
};

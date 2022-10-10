let groups = [];

const getNewGroupData = (newGroup) => {
  groups.push(newGroup);
  selectedGroup(newGroup.id);
};

const selectedGroup = (groupId) => {
  const tempGroups = groups.map((group) => {
    if (group.id === groupId) {
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

export { groups, getNewGroupData, selectedGroup, deleteGroup };

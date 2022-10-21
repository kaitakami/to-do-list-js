import { renderTasks } from "./addTaskUI";
import {
  groupsSetLS,
  groupsLocalStorage,
  selectedGroupLocalStorage,
  selectedGroupSetLS,
} from "./localStorage";

let groups = groupsLocalStorage || [];
let selectedGroup = selectedGroupLocalStorage || {
  name: "all",
  color: undefined,
  id: "1",
  selected: true,
}; // by default all tasks area selected
const getNewGroupData = (newGroup) => {
  groups.push(newGroup);
  newGroupSelected(newGroup.id);
};

const newGroupSelected = (groupId) => {
  if (groupId === "all") {
    selectedGroup = { id: "all" };
    selectedGroupSetLS(selectedGroup);
  }
  if (groupId === "today") {
    selectedGroup = { id: "today" };
  }
  const tempGroups = groups.map((group) => {
    if (group.id === groupId) {
      selectedGroup = group;
      selectedGroupSetLS(selectedGroup);
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
  groupsSetLS(groups);

  renderTasks();
};

const deleteGroup = (groupId) => {
  const tempGroups = groups.filter((group) => group.id !== groupId);
  console.log(tempGroups);
  groups = [...tempGroups];
  groupsSetLS(groups);
};

export {
  groups,
  getNewGroupData,
  newGroupSelected,
  deleteGroup,
  selectedGroup,
};

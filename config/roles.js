const allRoles = {
  admin: ["getUsers", "editUsers", "updateUsers", "deleteUsers"],
  editor: ["changeData"],
  viewer: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

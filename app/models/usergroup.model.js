module.exports = (sequelize, Sequelize) => {
  const UserGroup = sequelize.define("user_groups", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    user_department_id: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  });
  return UserGroup;
};

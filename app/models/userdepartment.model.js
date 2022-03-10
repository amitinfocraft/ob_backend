module.exports = (sequelize, Sequelize) => {
  const UserDepartment = sequelize.define("user_departments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return UserDepartment;
};

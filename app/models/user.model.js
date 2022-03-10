module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    mobile_no: {
      type: Sequelize.STRING
    },
    user_group_id: {
      type: Sequelize.INTEGER
    },
    user_department_id: {
      type: Sequelize.INTEGER
    }
  });
  return User;
};

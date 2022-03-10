module.exports = (sequelize, Sequelize) => {
  const UserWiseAccess = sequelize.define("user_wise_access", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    workflow_id: {
      type: Sequelize.INTEGER
    },
    user_group_id: {
      type: Sequelize.INTEGER
    },
    app_id: {
      type: Sequelize.INTEGER
    },
    access_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });
  return UserWiseAccess;
};

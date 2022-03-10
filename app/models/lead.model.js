module.exports = (sequelize, Sequelize) => {
  const Lead = sequelize.define("test", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    first: {
      type: Sequelize.STRING
    }
  });
  return Lead;
};

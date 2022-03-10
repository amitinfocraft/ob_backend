module.exports = (sequelize, Sequelize) => {
  const Workflow = sequelize.define("workflows", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Workflow;
};

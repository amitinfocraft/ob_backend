module.exports = (sequelize, Sequelize) => {
  const Access = sequelize.define("access", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Access;
};

module.exports = (sequelize, Sequelize) => {
  const App = sequelize.define("app", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return App;
};

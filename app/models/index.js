const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.userdepartment = require("../models/userdepartment.model.js")(sequelize, Sequelize);
db.usergroup = require("../models/usergroup.model.js")(sequelize, Sequelize);
db.app = require("../models/app.model.js")(sequelize, Sequelize);
db.workflow = require("../models/workflow.model.js")(sequelize, Sequelize);
db.access = require("../models/access.model.js")(sequelize, Sequelize);
db.groupaccess = require("../models/groupaccess.model.js")(sequelize, Sequelize);
db.userwiseaccess = require("../models/usergroupaccess.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["Broker", "Customer", "Executive", "Vendor"];
module.exports = db;

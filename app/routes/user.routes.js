const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const client = require("../config/connection.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/users/list",
    [authJwt.verifyToken],
    controller.list
  );
  app.get(
    "/api/users/details",
    [authJwt.verifyToken],
    controller.findById
  );
  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
  // app.get(
  //   "/api/users",
  //   [authJwt.verifyToken],
  //   controller.user
  // );

  app.get(
    "/api/department",
    controller.department
  );

  app.get(
    "/api/access",
    controller.access
  );
  app.get(
    "/api/app",
    controller.app
  );
  app.get(
    "/api/workflow",
    controller.workflow
  );
  app.get(
    "/api/group",
    controller.group
  );
  app.get(
    "/api/role",
    controller.roles
  );

  app.post(
    "/api/group/create",
    [authJwt.verifyToken],
    controller.groupcreate
  );

  app.get(
    "/api/group/details",
    [authJwt.verifyToken],
    controller.getAccessgroup
  );

  app.post(
    "/api/user/create",
    [authJwt.verifyToken],
    controller.usercreate
  );


//client.connect();
};

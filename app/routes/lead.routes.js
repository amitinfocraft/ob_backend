const { authJwt } = require("../middleware");
const controller = require("../controllers/lead.controller");
const leadcustomercontroller = require("../controllers/leadcustomer.controller");
const client = require("../config/connection.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //app.get("/api/lead/all", controller.allAccess);
  app.get(
    "/api/lead/list",
    [authJwt.verifyToken],
    controller.findAll
  );
  app.post(
    "/api/lead/add",
    [authJwt.verifyToken],
    controller.create
  );
  app.get(
    "/api/lead/details",
    [authJwt.verifyToken],
    controller.findById
  );
  //app.post('/', controller.create);
  // app.get(
  //   "/api/lead/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
  app.post(
    "/api/leadCustomer/add",
    [authJwt.verifyToken],
    leadcustomercontroller.create
  );

  app.post(
    "/api/leadCustomer/list",
    [authJwt.verifyToken],
    leadcustomercontroller.findAll
  );
  app.get(
    "/api/leadCustomer/details",
    [authJwt.verifyToken],
    leadcustomercontroller.findById
  );
  app.get(
    "/api/leadCustomer/delete",
    [authJwt.verifyToken],
    leadcustomercontroller.delete
  );

};

const client = require("./app/config/connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-switch-user,x-access-token,token"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/*const db = require("./app/models");
const Role = db.role;
const Department = db.userdepartment;
const Group = db.usergroup;
const App = db.app;
const Access = db.access;
const GroupAccess = db.groupaccess;
const Usergroup = db.usergroup;
const Workflow = db.workflow;
db.sequelize.sync({ force: true }).then(() => {
  //   console.log('Drop and Resync Db');
  initial();
});*/


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/lead.routes')(app);
// set port, listen for requests

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BOQ application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

client.connect();


function initial() {
  Role.create({
    id: 1,
    name: "Broker(OB)"
  });
  Role.create({
    id: 2,
    name: "Customer"
  });
  Role.create({
    id: 3,
    name: "Executive Partner"
  });
  Role.create({
    id: 4,
    name: "Vendor"
  });

  Department.create({
    id: 1,
    name: "Design"
  });
  Department.create({
    id: 2,
    name: "Procurement"
  });
  Department.create({
    id: 3,
    name: "Finance"
  });

  App.create({
    id: 1,
    name: "Workbranch",
  });
  App.create({
    id: 2,
    name: "Customer Portal",
  });
  App.create({
    id: 3,
    name: "Vendor Portal",
  });

  Workflow.create({
    id: 1,
    name: "BOQ",
  });
  Workflow.create({
    id: 2,
    name: "Leads",
  });
  Workflow.create({
    id: 3,
    name: "Users",
  });

  Access.create({
    id: 1,
    name: "Admin",
  });
  Access.create({
    id: 2,
    name: "Approver",
  });
  Access.create({
    id: 3,
    name: "Viewer",
  });
  Access.create({
    id: 4,
    name: "Reviewer",
  });
  Access.create({
    id: 5,
    name: "Creator",
  });
}

const client = require("../config/connection.js");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.list = (req, res) => {
client.query(`Select users.id,users.firstname,users.lastname,users.username,users.email,users.mobile_no,user_groups.name as user_group,user_departments.name as user_department from users left join user_departments on user_departments.id = users.user_department_id  left join user_groups on user_groups.id = users.user_group_id`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }else{
      console.log(err);
    }
});
client.end;
};

exports.findById = (req, res) => {
  client.query(`Select users.id,users.firstname,users.lastname,users.username,users.email,users.mobile_no,user_groups.name as user_group,user_departments.name as user_department from users left join user_departments on user_departments.id = users.user_department_id  left join user_groups on user_groups.id = users.user_group_id`, (err, result)=>{
      if(!err){
        res.send(result.rows);
    }else{
      res.send(err);
    }
  });
  client.end;
};

exports.department = (req, res) => {
client.query(`Select * from user_departments`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.group = (req, res) => {
client.query(`Select * from user_groups`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.access = (req, res) => {
client.query(`Select * from accesses`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.app = (req, res) => {
client.query(`Select * from apps`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.workflow = (req, res) => {
client.query(`Select * from workflows`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.roles = (req, res) => {
client.query(`Select * from roles`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
});
client.end;
};

exports.groupcreate = function(req, res) {
  const user = req.body;
  const getaccessgroup = user.group_access;
//   for (var i in getaccessgroup) {
//   console.log(gg[i].app);
// }
  //console.log(gg);exit;
 const now = new Date();
   let insertQuery = `insert into user_groups(name, description, role_id, user_department_id, "createdAt", "updatedAt")
                      values('${user.group_name}', '${user.group_name}', '${user.role_id}', '${user.user_department_id}', 'now', 'now') RETURNING id`
                   console.log(insertQuery);
   client.query(insertQuery, (err, result)=>{
       if(!err){
          var newlyCreatedUserId = result.rows[0].id;
          var workflow = 0;
          var app = 0;
          for (var i in getaccessgroup) {
           app = getaccessgroup[i].appId;
           workflow = getaccessgroup[i].workflowId;
          // console.log(app);
          // console.log(workflow);

          let insertQuery1 = `insert into user_group_accesses(workflow_id, user_group_id, access_id,app_id, status, "createdAt", "updatedAt")
                             values('${getaccessgroup[i].workflowId}', '${result.rows[0].id}', '${getaccessgroup[i].accessId}', '${getaccessgroup[i].appId}', '1', 'now', 'now')`

          client.query(insertQuery1, (err, result)=>{
            if (err){ //handle error
                console.log(err.message);
              }
            });
          }

           res.send('Insertion was successful')
       }
       else{ console.log(err.message) }
   })
   client.end;
  };

  exports.getAccessgroup = (req, res) => {
var array = [];
  client.query(`Select * from user_groups where id='${req.query.id}'`, (err, result)=>{
      if(!err){
        //console.log(result.rows);
        var groupname = result.rows[0].name;
        var role = result.rows[0].role_id;
        var userdepartment = result.rows[0].user_department_id;
        var jsonStr = '{"group_name":"'+ groupname +'","role_id":"'+ role +'","user_department_id":"'+ userdepartment +'","group_access":[]}';
        var obj = JSON.parse(jsonStr);
          client.query(`Select * from user_group_accesses where user_group_id='${req.query.id}'`, (err, result)=>{
              if(!err){
                  for (var d in result.rows) {
                    console.log(result.rows[d]);
                    obj['group_access'].push({"appId":result.rows[d].app_id,"workflowId":result.rows[d].workflow_id});
                    jsonStr = JSON.stringify(obj);

                  }
                  res.send(jsonStr);
              }
          });
      }
  });
  client.end;
  };

  var jwt = require("jsonwebtoken");
  var bcrypt = require("bcryptjs");
  exports.usercreate = function(req, res) {
    const user = req.body;
    const getaccessgroup = user.group_access;
  //   for (var i in getaccessgroup) {
  //   console.log(gg[i].app);
  // }
    //console.log(gg);exit;
   const now = new Date();
     let insertQuery = `insert into users(username, firstname, lastname, email, mobile_no, user_group_id, user_department_id, password, "createdAt", "updatedAt")
                        values('${user.email}', '${user.firstname}', '${user.lastname}', '${user.email}','${user.mobile_no}','${user.user_group_id}','${user.user_department_id}', '${bcrypt.hashSync('12345678', 8)}', 'now', 'now') RETURNING id`
                     console.log(insertQuery);
     client.query(insertQuery, (err, result)=>{
         if(!err){
            var newlyCreatedUserId = result.rows[0].id;
            var workflow = 0;
            var app = 0;
            for (var i in getaccessgroup) {
             app = getaccessgroup[i].appId;
             workflow = getaccessgroup[i].workflowId;
            // console.log(app);
            // console.log(workflow);

            let insertQuery1 = `insert into user_wise_accesses(workflow_id, user_group_id, access_id,app_id, "createdAt", "updatedAt")
                               values('${getaccessgroup[i].workflowId}', '${result.rows[0].id}', '${getaccessgroup[i].accessId}', '${getaccessgroup[i].appId}', 'now', 'now')`

            client.query(insertQuery1, (err, result)=>{
              if (err){ //handle error
                  console.log(err.message);
                }
              });
            }

             res.send('Insertion was successful')
         }
         else{ console.log(err.message) }
     })
     client.end;
    };

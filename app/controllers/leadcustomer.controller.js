'use strict';
const db = require("../models");
const client = require("../config/connection.js");

    exports.findAll = function(req, res) {
        console.log(req);
        client.query(`Select * from lead_contact`, (err, result)=>{
          if(!err){
              res.send(result.rows);
          }else{
            res.send(err);
          }
        });
        client.end;
       };


   exports.create = function(req, res) {
     const user = req.body;
     console.log(user);
      let insertQuery = `insert into lead_contact(leadid, contactfirstname, contactmiddlename, contactlastname, contactmobilenumber, contactemail, contactdco)
                         values('${user.leadid}', '${user.first_name}', '${user.middle_name}', '${user.last_name}', '${user.mobile_no}', '${user.email}', '${user.dco}')`
                      console.log(insertQuery);
      client.query(insertQuery, (err, result)=>{
          if(!err){
              res.send('Contact details submit successfully')
          }
          else{ console.log(err.message) }
      })
      client.end;
     };

     exports.findById = function(req, res) {
       console.log(req);
       client.query(`Select * from lead_contact where contactid =${req.query.id}`, (err, result)=>{
         if(!err){
             res.send(result.rows);
         }else{
           res.send(err);
         }
       });
       client.end;
      };

      exports.delete = function(req, res) {
        console.log(req);
        let insertQuery = `delete from lead_contact where contactid=${req.query.id}`

        client.query(insertQuery, (err, result)=>{
            if(!err){
                res.send('Deletion was successful')
            }
            else{ console.log(err.message) }
        })
        client.end;
       };

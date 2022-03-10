'use strict';
const db = require("../models");
const client = require("../config/connection.js");

    exports.findAll = function(req, res) {
        // client.query(`Select * from leads`, (err, result)=>{
        //     if(!err){
        //         res.send(result.rows);
        //     }
        // });
        // client.end;
        console.log(req.query);
        client.query(`Select * from leads where leaddco >='${req.query.todate}' and leaddco <'${req.query.fromdate}' and status ='${req.query.status}' and leadid='${req.query.leadid}' and customerid ='${req.query.customerid}' and projecttype ='${req.query.projecttype}'`, (err, result)=>{
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
      let insertQuery = `insert into leads(customerid, companyname, projecttype, longitude, latitude, area, channel, leaddco, assignedto, status)
                         values('${user.customerid}', '${user.companyname}', '${user.projecttype}', '${user.longitude}', '${user.latitude}', '${user.area}', '${user.channel}', '${user.leaddco}', '${user.assignedto}', '${user.status}')`
                      console.log(insertQuery);
      client.query(insertQuery, (err, result)=>{
          if(!err){
              res.send('Insertion was successful')
          }
          else{ console.log(err.message) }
      })
      client.end;
     };

     exports.findById = function(req, res) {
       console.log(req);
       client.query(`Select * from leads where leadid =${req.query.id}`, (err, result)=>{
         if(!err){
             res.send(result.rows);
         }else{
           res.send(err);
         }
       });
       client.end;
      };

      // exports.update = function(req, res) {
      //   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      //     res.status(400).send({
      //       error:true,
      //       message: 'Please provide all required field'
      //     });
      //   }else{
      //     Lead.update(req.params.id, new Lead(req.body), function(err, lead) {
      //       if (err)
      //       res.send(err);
      //       res.json({ error:false, message: 'Lead successfully updated' });
      //     });
      //   }
      // };

      // exports.delete = function(req, res) {
      //   Lead.delete( req.params.id, function(err, lead) {
      //     if (err)
      //     res.send(err);
      //     res.json({ error:false, message: 'Lead successfully deleted' });
      //   });
      // };

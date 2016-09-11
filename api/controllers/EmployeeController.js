/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:8080/employee"

module.exports = {

  /**
   * `EmployeeController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect('/create');
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect('/create');

        })
 
  },


  /**
   * `EmployeeController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {employees: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the employees"}});
    });

  },


  /**
   * `EmployeeController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `EmployeeController.delete()`
   */
  delete: function (req, res) {
    
    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('delete', {employees: data});
      }).on('error', function (err) {
          return res.view('delete', {error: { message: "There was an error getting the employees"}});
      });

    }else{
     
      client.delete(endpoint + "/" + req.body.employeeId, function (data, response) {
        // return res.view('create', {success: { message: "Record added successfully"}});
        if(response.statusCode != "204"){
            req.addFlash("error", data.message);
            return res.redirect('/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/delete');

      })
    }
 
  }

};


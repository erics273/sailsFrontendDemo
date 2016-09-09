/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/movies"

module.exports = {

  /**
   * `MovieController.create()`
   */
  create: function (req, res) 
  {
        
        if(req.method != "POST")
        {
          return res.view('create');
        }

        var args = 
        {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) 
        {
            //return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201")
            {
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }
            
            return res.view('create', {success:{message: "Record created successfully"}});

        })
  },






  /**
   * `MovieController.read()`
   */
  read: function (req, res) 
  {

    client.get(endpoint, function (data, response) 
    {
        return res.view('read', {movies: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the records"}});
    });

  },





  /**
   * `MovieController.update()`
   */
  update: function (req, res) {

      var values = req.allParams();
      var modifiedEndpoint = "http://localhost:1337/movies/" + values.id;
       
       //this calls the data you need to update
        if(req.method != "POST"){
          client.get(endpoint, function (data, response) {
            return res.view('update', {movies: data});
          }).on('error', function (err) {
            return res.view('update', {error: { message: "There was an error getting the records"}});
          });

        }else{
          var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         //this actually updates
        client.put(modifiedEndpoint, args, function (data, response) {
            //return res.view('create', {success: { message: "Record edited successfully"}});
            if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }
            return res.redirect('back');
            return res.view('update', {success:{message: "Record edited successfully"}});

        })
        }
          
        
      },










  /**
   * `MovieController.delete()`
   */
  delete: function (req, res)  {

     
      var values = req.allParams();
      var modifiedEndpoint = "http://localhost:1337/movies/" + values.id;
       
       //this calls the data you need to delete and populates the table
        if(req.method != "POST"){
          client.get(endpoint, function (data, response) {
            return res.view('delete', {movies: data});
          }).on('error', function (err) {
            return res.view('delete', {error: { message: "There was an error getting the records"}});
          });

        }else{
          var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         //this actually deletes
        client.delete(modifiedEndpoint, args, function (data, response) {
            //return res.view('create', {success: { message: "Record delete successfully"}});
            if(response.statusCode != "200"){
                return res.view('delete', {error:{message: response.statusMessage + ": " + data.reason}});
            }
            return res.redirect('back');
            return res.view('delete', {success:{message: "Record deleted successfully"}});

        })
      }
 }
  };



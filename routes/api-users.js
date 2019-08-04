console.log("Running api-users.js");


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our user model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Users
  app.get("/api/like", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.likes.findAll({}).then(function(dblikes) {
      // We have access to the Users as an argument inside of the callback function
      res.json(dblikes);
    });
  });

  // POST route for saving a new like
  app.post("/api/like", function(req, res) 
    {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.likes.create
        ({
          user_Email:    current_user
        }).then(function(dbusers) 
        {
          // We have access to the new Like as an argument inside of the callback function
          res.json(dbusers);
        });
    });
};
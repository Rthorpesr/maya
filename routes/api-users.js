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

  // POST route for saving a new like
  app.post("/api/like", function(req, res) 
    {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.users.create
        ({
          userEmail:    "John.Doe@verizon.net"
        }).then(function(dbusers) 
        {
          // We have access to the new Like as an argument inside of the callback function
          res.json(dbusers);
        });
    });
};
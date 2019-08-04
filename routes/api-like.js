console.log("Running api-like.js");


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Like model
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
        db.likes.create
        ({
          L_title:      "likeSearch.title", 
          L_source_url:  "likeSearch.sourceurl",
          L_image_url:   "likeSearch.imageurl",
          L_Email:      "john.doe@verizon.net"
        }).then(function(dblikes) 
        {
          // We have access to the new Like as an argument inside of the callback function
          res.json(dblikes);
        });
    });
};
console.log("Running api-svlater.js");


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our svlater model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for saving a new like
  app.post("/api/svlater", function(req, res) 
    {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.svlaters.create
        ({
          SVL_title:      "laterSearch.title", 
          SVL_source_url:  "laterSearch.sourceurl",
          SVL_image_url:   "laterSearch.imageurl",
          SVL_Email:      "john.doe@verizon.net"
        }).then(function(dbsvlaters) 
        {
          // We have access to the new svlaters as an argument inside of the callback function
          res.json(dbsvlaters);
        });
    }); 
};
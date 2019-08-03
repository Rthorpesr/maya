console.log("Running api-users.js");


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models/index(old)");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/recipe", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.recipes.findAll({}).then(function(dbrecipes) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbrecipes);
    });
  });

  // POST route for saving a new todo
  app.post("/api/recipes", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.recipe.create({
      userEmail:     req.body.text,
      L_title:       req.body.L_title,
      L_source_url:  req.body.L_source_url,
      L_image_url:   req.body.L_image_url,
      S_title:       req.body.S_title,
      S_source_url:  req.body.S_source_url,
      S_image_url:   req.body.S_image_url,
    }).then(function(dbrecipe) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbrecipe);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo we want to delete from
  // req.params.id
  app.delete("/api/recipe/:user_Email", function(req, res) {

  });

  // PUT route for updating todos. We can get the updated todo from req.body
  app.put("/api/recipe", function(req, res) {

  });
};
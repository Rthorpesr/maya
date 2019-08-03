console.log("Running api-routes.js");


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/recipes", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Recipes.findAll({}).then(function(dbRecipes) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbRecipes);
    });
  });

  // POST route for saving a new todo
  app.post("/api/recipes", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Recipe.create({
      text: req.body.text
      //complete: req.body.complete
    }).then(function(dbRecipe) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo we want to delete from
  // req.params.id
  app.delete("/api/recipes/:id", function(req, res) {

  });

  // PUT route for updating todos. We can get the updated todo from req.body
  app.put("/api/recipes", function(req, res) {

  });
};
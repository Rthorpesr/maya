"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
//path.basename returns the filename without the path
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
//remember that you can access object properties via bracket notation
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
    //process.env[config.use_env_variable] would contain a connection URL
    //for example: jdbc:mysql://neptune.acme.com:3306/test
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
      //file.slice(-3) means return the last three chars of the string
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("The database is = " +db);
module.exports = db;
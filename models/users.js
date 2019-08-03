console.log("Inside users.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      userEmail: DataTypes.STRING
    });
    return users;
  };
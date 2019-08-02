console.log("Step 4");

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
      userEmail: DataTypes.STRING
    });
    return user;
  };
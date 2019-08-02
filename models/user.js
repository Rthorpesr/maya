module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
      userEmail: DataTypes.STRING
    });
    return user;
  };
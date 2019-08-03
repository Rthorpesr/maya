console.log("Step 4");

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
      userEmail: DataTypes.STRING,
      updated_at:  DataTypes.DATE,
      deleted_at: DataTypes.DATE
    });
    return user;
  };

  'use strict';


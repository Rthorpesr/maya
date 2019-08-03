console.log("Inside saveforlater.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var saveforlater = sequelize.define("saveforlater", {
        S_title:       DataTypes.STRING,
        S_source_url:  DataTypes.STRING,
        S_image_url:   DataTypes.STRING,
        S_Email:       DataTypes.STRING
    });
    return saveforlater;
  };

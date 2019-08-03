console.log("Step 3");

module.exports = function(sequelize, DataTypes) {
    var saveforlater = sequelize.define("saveforlater", {
      S_Email:        DataTypes.STRING,
      S_title:        DataTypes.STRING,
      S_source_url:   DataTypes.STRING,   
      S_image_url:    DataTypes.STRING,   
      S_userEmail:    DataTypes.STRING,
      updated_at:  DataTypes.DATE,
      deleted_at: DataTypes.DATE           
    });
    return saveforlater;
  };
console.log("Step 2");

module.exports = function(sequelize, DataTypes) {
    var likes = sequelize.define("likes", {
      L_Email: DataTypes.STRING,
      L_title:      DataTypes.STRING,   
      L_source_url: DataTypes.STRING,    
      L_image_url:  DataTypes.STRING,
      updated_at:  DataTypes.DATE,
      deleted_at: DataTypes.DATE     
    });
    return likes;
  };
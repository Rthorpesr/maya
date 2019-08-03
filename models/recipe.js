console.log("Inside recipe.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var recipe = sequelize.define("recipe", {
        user_Email:    DataTypes.STRING,
        L_title:       DataTypes.STRING,
        L_source_url:  DataTypes.STRING,
        L_image_url:   DataTypes.STRING,
        S_title:       DataTypes.STRING,
        S_source_url:  DataTypes.STRING,
        S_image_url:   DataTypes.STRING
    });
    return recipe;
  };

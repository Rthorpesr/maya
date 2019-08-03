console.log("Inside likes.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var likes = sequelize.define("likes", {
        L_title:       DataTypes.STRING,
        L_source_url:  DataTypes.STRING,
        L_image_url:   DataTypes.STRING,
        L_Email:       DataTypes.STRING
    });
    return likes;
  };

console.log("Inside svlater.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var svlaters = sequelize.define("svlaters", {
        SVL_title:       DataTypes.STRING,
        SVL_source_url:  DataTypes.STRING,
        SVL_image_url:   DataTypes.STRING,
        SVL_Email:       DataTypes.STRING
    });
    return svlaters;
  };

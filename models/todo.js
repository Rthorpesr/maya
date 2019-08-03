console.log("Inside todo.js (Model)");


module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Todo;
  };
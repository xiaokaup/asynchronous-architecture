const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Task = sequelize.define("Task", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;

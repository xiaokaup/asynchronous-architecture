const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Task = sequelize.define("Task", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "PROCESSING", "COMPLETED", "FAILED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
  processingStartedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Task;

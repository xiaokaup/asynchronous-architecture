const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://user:pass@localhost:5432/dbname", {
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, connectDB };

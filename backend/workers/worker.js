const { Op } = require("sequelize");
const { Task } = require("../db/models");
const { sequelize } = require("../db/database");

async function processTask(task) {
  console.log(`Processing task with ID: ${task.id}`);

  // Simulate task processing
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await task.update({ status: "COMPLETED" });
  console.log(`Task ${task.id} completed`);
}

async function pollAndProcessTasks() {
  while (true) {
    const transaction = await sequelize.transaction();

    try {
      const task = await Task.findOne({
        where: {
          status: "PENDING",
          processingStartedAt: null,
        },
        order: [["createdAt", "ASC"]],
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (task) {
        await task.update(
          {
            status: "PROCESSING",
            processingStartedAt: new Date(),
          },
          { transaction }
        );

        await transaction.commit();

        await processTask(task);
      } else {
        await transaction.commit();
        // No tasks to process, wait for a bit before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      await transaction.rollback();
      console.error("Error processing task:", error);
      // Wait a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function startWorker() {
  console.log("Worker started");
  await pollAndProcessTasks();
}

startWorker();

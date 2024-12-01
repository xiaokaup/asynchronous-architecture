const amqp = require("amqplib");
const { Task } = require("../db/models");

async function startWorker() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("task_queue", { durable: true });

    console.log("Worker is waiting for tasks...");

    channel.consume(
      "task_queue",
      async (msg) => {
        if (msg !== null) {
          const taskId = msg.content.toString();
          console.log(`Received task with ID: ${taskId}`);

          // Simulate task processing
          await new Promise((resolve) => setTimeout(resolve, 5000));

          await Task.update({ status: "COMPLETED" }, { where: { id: taskId } });

          channel.ack(msg);
          console.log(`Task ${taskId} completed`);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error in worker:", error);
  }
}

startWorker();

const amqp = require("amqplib");

let channel;

async function connectQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("task_queue", { durable: true });
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
  }
}

async function publishTask(taskId) {
  if (!channel) await connectQueue();
  channel.sendToQueue("task_queue", Buffer.from(taskId.toString()), {
    persistent: true,
  });
}

module.exports = { connectQueue, publishTask };

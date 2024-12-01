const { Pool } = require("pg");
const { publishTask } = require("../queue/queue");

const pool = new Pool({
  connectionString: "postgres://user:pass@localhost:5432/dbname",
});

async function startListener() {
  const client = await pool.connect();
  try {
    await client.query("LISTEN task_created");
    console.log("Listening for task_created notifications");

    client.on("notification", async (msg) => {
      if (msg.channel === "task_created") {
        const taskId = msg.payload;
        console.log(`New task created with ID: ${taskId}`);
        await publishTask(taskId);
      }
    });
  } catch (err) {
    console.error("Error in database listener:", err);
    client.release();
  }
}

module.exports = { startListener };

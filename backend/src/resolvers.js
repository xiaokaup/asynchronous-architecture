const { Task } = require("../db/models");
const { publishTask } = require("../queue/queue");

const resolvers = {
  Query: {
    task: async (_, { id }) => {
      return await Task.findByPk(id);
    },
  },
  Mutation: {
    createTask: async (_, { input }) => {
      const task = await Task.create({ ...input, status: "PENDING" });
      await publishTask(task.id);
      return task;
    },
  },
};

module.exports = { resolvers };

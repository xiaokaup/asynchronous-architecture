const { Task } = require("../db/models");

const resolvers = {
  Query: {
    task: async (_, { id }) => {
      return await Task.findByPk(id);
    },
  },
  Mutation: {
    createTask: async (_, { input }) => {
      // We don't need to call publishTask here anymore
      // The database trigger and listener will handle it
      return await Task.create({ ...input, status: "PENDING" });
    },
  },
};

module.exports = { resolvers };

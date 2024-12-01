const { Task } = require("../db/models");

const resolvers = {
  Query: {
    task: async (_, { id }) => {
      return await Task.findByPk(id);
    },
  },
  Mutation: {
    createTask: async (_, { input }) => {
      return await Task.create({ ...input, status: "PENDING" });
    },
  },
};

module.exports = { resolvers };

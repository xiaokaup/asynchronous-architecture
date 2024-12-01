const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    id: ID!
    status: String!
  }

  input TaskInput {
    description: String!
  }

  type Query {
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput!): Task
  }
`;

module.exports = { typeDefs };

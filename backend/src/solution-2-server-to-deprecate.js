const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { connectDB } = require("../db/database");
const { startListener } = require("../db/solution-2-listener-to-deprecate");
const { connectQueue } = require("../solution-2-queue-to-deprecate/queue");

async function startServer() {
  const app = express();

  await connectDB();
  await connectQueue();
  startListener(); // Start the database listener

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();

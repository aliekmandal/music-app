const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

require("dotenv").config();

//Database Connection


mongoose.connect(
  process.env.MONGODB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB CONNECTED")
);


const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(3000, () => console.log("Server UP & Running 3000"));
};
startServer();
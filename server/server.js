require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'defaultSecret';
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


(async () => {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // If the user is authenticated, set the user to the `user` context
      return authMiddleware(req);
    },
    introspection: true,
    playground: true
  });

  // Start the Apollo Server before applying the middleware
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`));
  });
})();

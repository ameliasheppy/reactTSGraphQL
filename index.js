const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag')
const mongoose = require('mongoose')

//mongoose is our ORM!
//no
//handy to keep relative imports together and then other imports together
const typeDefs = require('./graphql/typeDefs')
const { MONGODB } = require('./config.js')
const Post = require('./models/Post')

//pass in our gql's in here! the server needs them
const server = new ApolloServer({
    typeDefs, 
    resolvers
})
//deconstr and add the useNewUrlParser so that we don't get a deprecation warning. returns a prom

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
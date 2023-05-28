const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')
//mongoose is our ORM!
//now lets write our gql types

const typeDefs = gql`
    type Query{
        sayHi: String
    }`
//need resolvers that will have a resolver called sayHi. 
//it will process what the query returns and do something with it
//put all of the queries in Query obj and mutations in a Mutation obj
const resolvers = {
    Query:{
        sayHi: () => 'Hello World'
    }
}

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
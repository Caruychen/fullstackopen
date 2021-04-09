require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const schema = require('./graphql')

const mongoUrl = process.env.MONGODB_URI
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })


const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
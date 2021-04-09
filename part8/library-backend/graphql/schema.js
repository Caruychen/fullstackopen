const { makeExecutableSchema } = require('apollo-server')
const { merge } = require('lodash')
const { 
  typeDef: Author,
  resolvers: authorResolvers
} = require('./schemas/author')
const {
  typeDef: Book,
  resolvers: bookResolvers
} = require('./schemas/book')

const Base = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Base, Author, Book],
  resolvers: merge(authorResolvers, bookResolvers)
})

module.exports = schema
const { UserInputError } = require('apollo-server')
const Book = require('../../models/book')
const Author = require('../../models/author')

const typeDef = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
    books: [Book!]!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.countDocuments({}),
    allAuthors: () => Author.find({}).populate('books')
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new UserInputError('not authenticated')
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return await author.save()
    }
  },
  Author: {
    bookCount: (root) => root.books.length
  },
}

module.exports = { typeDef, resolvers }
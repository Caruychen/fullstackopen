const { UserInputError } = require('apollo-server')
const Book = require('../../models/book')
const Author = require('../../models/author')

const typeDef = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    allBooks: async (root, args) => {
      const filters = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filters.author = author ? author._id : null
      }
      if (args.genre) filters.genres = { $in: [args.genre] }
      return Book.find(filters).populate('Author')
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.author
          })
        }
      }
      const book = new Book({
        ...args,
        author: author._id
      })
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return await book.populate('Author').execPopulate()
    },
  },
  Book: {
    author: (root) => Author.findById(root.author)
  }
}

module.exports = { typeDef, resolvers }
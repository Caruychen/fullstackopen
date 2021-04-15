const { UserInputError, PubSub } = require('apollo-server')
const Book = require('../../models/book')
const Author = require('../../models/author')

const pubsub = new PubSub()

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

  type Subscription {
    bookAdded: Book!
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
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new UserInputError('not authenticated')

      let author = await Author.findOne({ name: args.author })
      if (!author) author = new Author({ name: args.author })

      const book = new Book({
        ...args,
        author: author._id
      })
      author.books = author.books.concat(book._id)

      try {
        await author.save()
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      const savedBook = await book.populate('Author').execPopulate()
      
      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
      return savedBook
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Book: {
    author: (root) => Author.findById(root.author)
  }
}

module.exports = { typeDef, resolvers }
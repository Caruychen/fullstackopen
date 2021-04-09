const { UserInputError } = require('apollo-server-errors')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const User = require('../../models/user')

const typeDef = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

extend type Query {
  me: User
}

extend type Mutation {
  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        return await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secretPassword') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, SECRET)}
    }
  }
}

module.exports = { typeDef, resolvers }
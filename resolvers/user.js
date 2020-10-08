const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isRecipeOwner } = require('./middleware')

const User = require('../models/User')
const Recipe = require('../models/Recipe')

module.exports = {
  Query: {
    getUser: combineResolvers(isAuthenticated, async (_, __, { email }) => {
      try {
        const user = await User.findOne({ where: { email } })
        if (!user) throw new Error('User not found.')
        return user
      } catch (error) {
        console.log('getUser:', error)
        throw error
      }
    }),
    getUsers: async () => {
      try {
        const users = await User.findAll()
        return users
      } catch (error) {
        console.log('getUsers:', error)
        throw error
      }
    }
  },
  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const user = await User.findOne({ where: { email: input.email } })
        if (user) throw new Error('Email already in use')
        const hashedPassword = await bcrypt.hash(input.password, 12)
        const newUser = new User({ ...input, password: hashedPassword })
        const result = await newUser.save()
        return result
      } catch (error) {
        console.log('signUp error:', error)
        throw error
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ where: { email: input.email } })
        if (!user) throw new Error('User not found')
        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        )
        if (!isPasswordValid) throw new Error('Incorrect password')
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d'
          }
        )
        return { token }
      } catch (error) {
        console.log('logIn error:', error)
        throw error
      }
    }
  },
  User: {
    recipes: async ({ id }) => {
      try {
        const recipes = await Recipe.findAll({ where: { userId: id } })
        return recipes
      } catch (error) {
        console.log('user resolver:', error)
        throw error
      }
    }
  }
}

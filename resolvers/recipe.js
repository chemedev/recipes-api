const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isRecipeOwner } = require('./middleware')

const User = require('../models/User')
const Recipe = require('../models/Recipe')
const Category = require('../models/Category')
const { Op } = require('sequelize')

module.exports = {
  Query: {
    getRecipes: combineResolvers(isAuthenticated, async () => {
      try {
        const recipes = await Recipe.findAll()
        return recipes
      } catch (error) {
        console.log('getRecipes:', error)
        throw error
      }
    }),
    getOneRecipe: combineResolvers(isAuthenticated, async (_, { id }) => {
      try {
        const recipe = await Recipe.findOne({ where: { id } })
        return recipe
      } catch (error) {
        console.log('getOneRecipe:', error)
        throw error
      }
    }),
    getMyRecipes: combineResolvers(
      isAuthenticated,
      async (_, __, { loggedInUserId }) => {
        try {
          const recipes = await Recipe.findAll({
            where: { userId: loggedInUserId }
          })
          return recipes
        } catch (error) {
          console.log('getMyRecipes:', error)
          throw error
        }
      }
    ),
    getRecipesByName: combineResolvers(isAuthenticated, async (_, { name }) => {
      try {
        const recipes = await Recipe.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`
            }
          }
        })
        return recipes
      } catch (error) {
        console.log('getRecipesByName:', error)
        throw error
      }
    })
  },
  Mutation: {
    createRecipe: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        try {
          const user = await User.findOne({ where: { email } })
          const recipe = await new Recipe({ ...input, userId: user.id })
          const result = await recipe.save()
          return result
        } catch (error) {
          console.log('createRecipe:', error)
          throw error
        }
      }
    ),
    updateRecipe: combineResolvers(
      isAuthenticated,
      isRecipeOwner,
      async (_, { id, input }) => {
        try {
          const recipe = await Recipe.findByPk(id)
          const result = await recipe.update({ ...input })
          return result
        } catch (error) {
          console.log('updateRecipe:', error)
          throw error
        }
      }
    ),
    deleteRecipe: combineResolvers(
      isAuthenticated,
      isRecipeOwner,
      async (_, { id }) => {
        try {
          const recipe = await Recipe.findOne({ where: { id } })
          await recipe.destroy()
          return recipe
        } catch (error) {
          console.log('deleteRecipe:', error)
          throw error
        }
      }
    )
  },
  Recipe: {
    user: async ({ userId }) => {
      try {
        const user = await User.findOne({ where: { id: userId } })
        return user
      } catch (error) {
        console.log('recipe resolvers user:', error)
        throw error
      }
    },
    category: async ({ categoryId }) => {
      try {
        const category = await Category.findOne({ where: { id: categoryId } })
        return category
      } catch (error) {
        console.log('recipe resolvers category:', error)
        throw error
      }
    }
  }
}

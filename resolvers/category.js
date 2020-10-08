const { isAuthenticated } = require('./middleware')
const { combineResolvers } = require('graphql-resolvers')

const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

module.exports = {
  Query: {
    getCategories: async () => {
      try {
        const categories = await Category.findAll()
        return categories
      } catch (error) {
        console.log('getCategories:', error)
        throw error
      }
    },
    getOneCategory: async (_, { id }) => {
      try {
        const category = await Category.findOne({ where: { id } })
        return category
      } catch (error) {
        console.log('getOneCategory:', error)
        throw error
      }
    }
  },
  Mutation: {
    createCategory: combineResolvers(isAuthenticated, async (_, { input }) => {
      try {
        const category = await Category.findOne({ where: { name: input.name } })
        if (category) throw new Error('Category already exists')
        const newCategory = new Category({ ...input })
        const result = await newCategory.save()
        return result
      } catch (error) {
        console.log('createCategory:', error)
        throw error
      }
    }),
    updateCategory: combineResolvers(
      isAuthenticated,
      async (_, { id, input }) => {
        try {
          const category = await Category.findByPk(id)
          const result = await category.update({ ...input })
          return result
        } catch (error) {
          console.log('updateCategory:', error)
          throw error
        }
      }
    ),
    deleteCategory: combineResolvers(isAuthenticated, async (_, { id }) => {
      try {
        const category = await Category.findOne({ where: { id } })
        await category.destroy()
        return category
      } catch (error) {
        console.log('deleteCategory:', error)
        throw error
      }
    })
  },
  Category: {
    recipes: async ({ id }) => {
      try {
        const recipes = await Recipe.findAll({ where: { categoryId: id } })
        return recipes
      } catch (error) {
        console.log('category resolver:', error)
        throw error
      }
    }
  }
}

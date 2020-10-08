const { skip } = require('graphql-resolvers')
const Recipe = require('../../models/Recipe')

module.exports.isAuthenticated = (_, __, { email }) => {
  try {
    if (!email) {
      throw new Error('Access Denied! Please login to continue.')
    }
    return skip
  } catch (error) {
    console.log('isAuthenticated:', error)
    throw error
  }
}

module.exports.isRecipeOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    const recipe = await Recipe.findByPk(id)
    if (!recipe) {
      throw new Error('Recipe not found')
    } else if (recipe.userId !== loggedInUserId) {
      throw new Error('Not authorized as task owner')
    }
    return skip
  } catch (error) {
    console.log('isRecipeOwner:', error)
    throw error
  }
}

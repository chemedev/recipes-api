const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getRecipes: [Recipe!]
    getOneRecipe(id: ID!): Recipe
    getMyRecipes: [Recipe!]
    getRecipesByName(name: String!): [Recipe!]
    getRecipesByIngredient(ingredient: String!): [Recipe!]
  }

  input createRecipeInput {
    name: String!
    description: String!
    ingredients: String!
    categoryId: Int!
  }

  input updateRecipeInput {
    name: String
    description: String
    ingredients: String
    categoryId: Int
  }

  extend type Mutation {
    createRecipe(input: createRecipeInput!): Recipe
    updateRecipe(id: ID!, input: updateRecipeInput!): Recipe
    deleteRecipe(id: ID!): Recipe
  }

  type Recipe {
    id: ID!
    name: String!
    description: String!
    ingredients: String!
    category: Category!
    user: User!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date
  }
`

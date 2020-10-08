const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getUsers: [User]
    getUser: User
  }

  input signUpInput {
    name: String!
    email: String!
    password: String!
    recipes: [String!]
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    signUp(input: signUpInput): User
    login(input: loginInput): Token
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    recipes: [Recipe!]
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date
  }
`

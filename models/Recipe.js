const { DataTypes } = require('sequelize')
const db = require('../database')

const User = require('./User')
const Category = require('./Category')

const Recipe = db.define(
  'recipe',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      references: {
        model: Category,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    paranoid: true
  }
)

module.exports = Recipe

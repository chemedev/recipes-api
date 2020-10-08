const { DataTypes } = require('sequelize')
const db = require('../database')

const Category = db.define(
  'category',
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
    }
  },
  {
    paranoid: true
  }
)

module.exports = Category

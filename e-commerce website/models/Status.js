const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'status',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.INTEGER
    },
    img: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    iprice: {
      type: Sequelize.FLOAT
    },
    sizes: {
      type: Sequelize.INTEGER
    },
    sizem: {
      type: Sequelize.INTEGER
    },
    sizel: {
      type: Sequelize.INTEGER
    },
    gender: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
const Sequelize = require('sequelize')
const db = require('../index.js')

const Transaction = db.define('shares', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER
  }
})


module.exports = Transaction

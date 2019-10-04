const Sequelize = require('sequelize')
const db = require('../index.js')

const Transaction = db.define('shares', {
  ticker: {
    type: Sequelize.STRING,
    unique: true,
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
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})


module.exports = Transaction

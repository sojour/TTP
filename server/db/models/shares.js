const Sequelize = require('sequelize')
const db = require('../index.js')

const Shares = db.define('shares', {
  ticker: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }
})


module.exports = Shares

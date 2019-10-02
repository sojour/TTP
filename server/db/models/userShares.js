const Sequelize = require('sequelize')
const db = require('../index.js')

const UserShares = db.define('usershares', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
});


module.exports = UserShares;

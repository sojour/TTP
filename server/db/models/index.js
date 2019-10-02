const User = require('./user')
const Shares = require('./shares')
const UserShares = require('./userShares')

Shares.belongsToMany(User, { through: UserShares });


module.exports = {
  User,
  Shares,
  UserShares
}

const User = require('./user')
const Shares = require('./shares')

User.hasMany(Shares);
Shares.belongsToMany(User);


module.exports = {
  User,
  Shares
}

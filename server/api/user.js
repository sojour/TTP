const router = require('express').Router()
const { User } = require('../db/models')

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      res.status(401).send('No such user found!');
    } else if (!user.correctPassword(password)) {
      res.status(401).send('Wrong password, try again');
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
})

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('User already exists');
    } else {
      next(err);
    }
  }
})


module.exports = router

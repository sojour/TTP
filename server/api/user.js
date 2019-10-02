const router = require('express').Router()
const { User } = require('../db/models')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      res.status(401).send('No such user found!');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong password, try again');
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    })
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('User already exists');
    } else {
      next(err);
    }
  }
})


module.exports = router

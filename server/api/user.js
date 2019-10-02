const router = require('express').Router()
const { User } = require('../db/models')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      res.send('No such user found!')
    } else if (!user.correctPassword(req.body.password)) {
      res.send('Wrong password, try again')
    } else {
      res.send(user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    })
    res.send(user)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.sendStatus('User already exists')
    } else {
      next(err)
    }
  }
})


module.exports = router

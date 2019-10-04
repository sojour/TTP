const router = require('express').Router()
const { Transaction } = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId
      }
    });

    res.json(transactions)
  } catch (err) {
    next(err);
  }
})

router.post('/:userId', async (req, res, next) => {
  try {

  } catch (error) {

  }
})

module.exports = router

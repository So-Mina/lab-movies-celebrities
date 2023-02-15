var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'Home Page' })
  } catch (error) {
    next(error)
  }
})

router.use('/celebrities', require('./celebrities.routes'))
router.use('/movies', require('./movies.routes'))

module.exports = router
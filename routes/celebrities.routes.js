const router = require("express").Router()
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
  console.log(req.body)
  const celebrity = {
    name : req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  }
  try {
    const newCelebrity = await Celebrity.create(celebrity)
    console.log(newCelebrity)
    res.redirect('/celebrities')
  } catch (error) {
    res.render('celebrities/new-celebrity', { errorMessage: 'Error creating celebrity' } )
  }
})

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('celebrities/celebrities', {
      title: 'Celebrities list',
      css: ['celebrities'],
       celebrities })
  } catch (error) {
    next(error)
  }
})

module.exports = router
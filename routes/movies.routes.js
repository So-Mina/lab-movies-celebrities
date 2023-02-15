const router = require("express").Router()
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/create', async (req, res) => {
  const celebrities = await Celebrity.find() 
  res.render('movies/new-movie', { celebrities })
})

router.post('/create', async (req, res, next) => {
  // console.log(req.body)
  const movie = {
    title : req.body.title,
    genre : req.body.genre,
    plot : req.body.plot,
    cast : req.body.cast
  }
  try {
    const newMovie = await Movie.create(movie)
    // console.log(newMovie)
    res.redirect('/movies')
  } catch (error) {
    res.render('movies/new-movie', { errorMessage: 'Error creating movie' } )
  }
})

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('cast')
    res.render('movies/movies', { 
      title : "Movies List",
      css: ['movies'],
      movies })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast')
    res.render('movies/movie-details', { 
      title: 'Movie details',
      css: ['movie-details'],
      movie })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/delete', async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id)
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const movieToUpdate = await Movie.findById(req.params.id)
    const celebrities = await Celebrity.find()
    res.render('movies/edit-movie', {
      title: 'Edit movie',
      movie: movieToUpdate, celebrities})
  } catch (error) {
    next (error)
  }
})

router.post('/:id/edit', async (req, res, next) => {
  console.log(req.body)
  try {
    const editedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new : true }
    )
  //console.log(editedMovie)
  res.redirect('/movies')
  } catch (error) {
    next(error)
  }
})

module.exports = router
const express = require('express');
const movieController = require('./../controllers/movieController');
const viewController = require('./../controllers/viewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:movieId/reviews', reviewRouter);
router.route('/getMovies').get(movieController.getAllMovies, viewController.getMovies);
router.route('/:id').get(movieController.getMovieById);
router.route('/addEntry').post(movieController.addMovies);

// router.get('/', movieController.getMovies);
module.exports = router;

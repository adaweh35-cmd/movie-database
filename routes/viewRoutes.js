const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const movieController = require('./../controllers/movieController');
const router = express.Router();

router.get('/movie/:slug',authController.isLoggedIn, movieController.similarMovies, viewController.getMovie);
router.get('/movieGenre/:genre', viewController.genreMovies);
router.get('/', authController.isLoggedIn, authController.protect, movieController.getRecommendedMovies, viewController.getRecommondedMovies);
router.get('/login',  authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get('/person/:name', authController.isLoggedIn, authController.protect, viewController.getPerson);
router.get('/movies', authController.isLoggedIn, viewController.getMovies);
router.get('/getFollowedPeople', authController.protect, viewController.getFollowedPeople);
module.exports =  router;
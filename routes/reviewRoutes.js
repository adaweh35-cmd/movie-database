const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({mergeParams: true});

router.use(authController.protect);
// router.post('/', movieController.createMovie);
//router.use(reviewController.createReview);
router.route('/').post(reviewController.createReview);



// router.get('/', movieController.getMovies);
module.exports = router;
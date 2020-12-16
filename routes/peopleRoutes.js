const express = require('express');
const peopleController = require('./../controllers/peopleController');

const router = express.Router();

// router.post('/', movieController.createMovie);
router.route('/').get(peopleController.getPersons);
router.route('/:id').get(peopleController.getPersonById);

// router.get('/', movieController.getMovies);
module.exports = router;
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const { route } = require('./viewRoutes');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.patch('/addFollowedPerson', userController.pushFollowedPerson);
router.delete('/deleteFollowedPerson', userController.removeFollowedPerson);
// router.use(authController.isLoggedIn);

module.exports =  router;
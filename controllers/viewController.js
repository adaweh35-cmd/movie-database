const Movie = require('../models/movieModel');
const Person = require('../models/personModel');

exports.getRecommondedMovies = async(req, res) => {
  // console.log(req.movies);
  const movies = await Movie.find();
  res.status(200).render('recommended', {
    
    movies: req.movies
  });
}

exports.genreMovies = async(req, res) => {
  const allMovies = await Movie.find();
  const movies = [];
  allMovies.forEach((el) => {
    if(el.Genre.includes(req.params.genre)) {
      movies.push(el);
    }   
  });
  res.status(200).render('movieGenre', {
    movies
  });
}

exports.getMovie= async(req, res) => {
  
  const movie = await Movie.findOne({slug: req.params.slug}).populate('reviews'); 
  // console.log(req.similarMovies);
  

  
  res.status(200).render('movieDetail', {
    similarMovies: req.similarMovies,
    movie
  });
}
exports.getMovies = async(req, res) => {  
  const movies =  req.movies;
  res.status(200).render('movieGenre', {
    movies
  });
 
} 
exports.getPerson = async(req,res) => {
  const person = await Person.findOne({Name: req.params.name});
  console.log(person);
  res.status(200).render('person', {
    person,
    user: req.user
  });
}
exports.getLoginForm = async(req,res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
}
exports.getSignUpForm = async(req,res) => {
  res.status(200).render('signup', {
    title: 'Create an account'
  });
}

exports.getFollowedPeople = async(req, res) => {
  if (req.user.followedPeople == null || req.user.followedPeople.length == 0) {
    return;
  }
  // console.log(req.user.followedPeople);
  
  res.status(200).render('followedPeople', {
    persons: req.user.followedPeople
  });
}


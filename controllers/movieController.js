const express = require('express');
const catchAsync = require('./../utils/catchAsync');

const Movie = require('./../models/movieModel');
const Person = require('./../models/personModel');
const { create } = require('./../models/personModel');



exports.addMovies = async (req, res) => {
  const movie = await Movie.create({Title: req.body.movTitle, Year: req.body.year, Rated: req.body.rated, Genre: req.body.genre, Director: req.body.director, Actors: req.body.actors});
  res.status(200).json({
    status: 'success',
    data: movie
  });
}

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
};

exports.getAllMovies = async (req, res, next) => {
  // 1) Building Query
  const queryObj = { ...req.query };
  let genreval = "";
  let movieArray = [];
  const includedFields = ['Title', 'Year', 'Genre'];
  const keyArray = Object.keys(queryObj);
  keyArray.forEach((el) => {
    if (!includedFields.includes(el)) {
      delete queryObj[el];
    }
  });
  
  genreval = queryObj['Genre'];
  delete queryObj['Genre'];
  
   //2) Searching Database for query
  let movies = await Movie.find(queryObj).populate('reviews');
  if (genreval != null && genreval != "") {
    var len = movies.length;
    var n = 1;
    movies.forEach((el) => {
      
      if(el.Genre.includes(genreval)) {
        movieArray.push(el);
      }  
        n++;
      if (n == len && movieArray.length !=0) {
        req.movies = movieArray;
        //console.log(req.movies);
        next();
      }
       
    });
    // console.log(movieArray);
    // req.movies = movieArray;
    // return next();
  }
  req.movies = movies;
  next();

  

  // 3) Send search result to client

};

exports.similarMovies = async(req, res, next) => {
 
  const movie = await Movie.findOne({slug: req.params.slug});
  const movies = await Movie.find();
  const moviesArray= [];
  let movieGenre = movie.Genre.split(',');
  movies.forEach((el) => {
    if (el.Title == movie.Title) return;
    var count = 0;
    let currentGenre = el.Genre.split(',');
    
    for (var i=0; i < movieGenre.length; i++) {
      // console.log(el.Title);
      //console.log(currentGenre);
      //console.log(movieGenre[i]);
      if (currentGenre.includes(movieGenre[i])) {
        // console.log("in the if statement")
        // console.log(currentGenre);
        // console.log(movieGenre[i]);
        count++;
      }
      if (count == 2) {
        moviesArray.push(el);
        break;
      }
    }
  }); 
  req.similarMovies = moviesArray;
  next(); 
};


exports.getRecommendedMovies = async (req, res, next) => {
  // let users see their reviews

  const movieArray = [];
  let personArray = [];
  
  // console.log(req.user.followedPeople.length);
  if (req.user.followedPeople.length > 0) {
    
    req.user.followedPeople.forEach((el) => {
      personArray.push(el);
    });

    var promise = Person.find({Name: {$in: personArray}}).exec();
    promise.then(function(arrayOfPeople) {
      
      for (var i=0; i < arrayOfPeople.length; i++) {
        movieArray.push(arrayOfPeople[i].MovieId);
      }
      var prmise = Movie.find({_id: {$in: movieArray}}).exec();
      prmise.then(function(arrayOfMovies) {
        // console.log(arrayOfMovies);
        req.movies = arrayOfMovies;
        next();
      });
      
    })
  };
  
  
}
const express = require('express');

const Review = require('./../models/reviewModel');
const Movie = require('./../models/movieModel');

exports.createReview = async (req, res) => {
  if(!req.body.movie) req.body.movie = req.params.movieId;
  if(!req.body.user) req.body.user = req.user.id;
 
  const review = await Review.create({Score: req.body.scoreVal, Summary: req.body.summaryVal, Review: req.body.reviewVal, movie: req.body.movieId, user: req.body.user});
  
  
  res.status(200).json({
    status: 'success',
    data: review,
  });
};


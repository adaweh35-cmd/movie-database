const mongoose = require('mongoose');
const Movie = require('./movieModel');
const User = require('./userModel');
const slugify = require('slugify');
const reviewSchema = new mongoose.Schema(
  {
    Score: Number,
    Summary: String,
    Review: String,
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Review must belong to a movie.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to User']
    }
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'movie',
//     select: 'Title'
//   }).populate({
//     path:'user',
//     select: 'Name'
//   });
// })


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

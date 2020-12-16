const mongoose = require('mongoose');
const slugify = require('slugify');
const Person = require('./personModel');
const User = require('./userModel');
const movieSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      trim: true,
    },
    slug: String,
    Year: String,
    Rated: {
      type: String,
      enum: ['PG', 'PG-13', 'R', 'G'],
    },
    Released: String,
    Runtime: String,
    Genre: {
      type: String,
      trim: true,
    },
    Director: {
      type: String,
    },
    Writer: {
      type: String,
      trim: true,
    },
    Actors: {
      type: String,
      trim: true,
    },
    Plot: {
      type: String,
    },
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [
      {
        Source: String,
        Value: String,
      },
    ],
    
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: String,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: String,
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});

movieSchema.pre('save', async function (next) {
 

  this.slug = slugify(this.Title, { lower: true });
  let newArray = this.Genre.split(',');
  this.Genre = newArray;
  
  
  next();
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
// const trimValues = function (writerString) {
//   finalArray = [];
//   let newArray = writerString.split(',');
//   this.Genre = 
//   //newArray.pop();
//   newArray.forEach((strn) => {
//     finalArray.push(strn.split(' (')[0]);
//   });
//   return finalArray;
// };

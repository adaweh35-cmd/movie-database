const mongoose = require('mongoose');
const Movie = require('./movieModel');
const slugify = require('slugify');
const personSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },
    slug: String,
    Role: String,
    MovieName: String,
    MovieId: String,
    movie: Object
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

personSchema.pre('save', async function(next) {
  this.movie = await Movie.findById(this.MovieId);
  this.slug = slugify(this.Name, { lower: true });
  
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

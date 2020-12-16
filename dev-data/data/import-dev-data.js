const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Movie = require('./../../models/movieModel');
const Person = require('./../../models/personModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful');
  });

// Read JSON FILE
const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/movie-data-short.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Movie.create(movies);

    await importPersonData();
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await Person.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);

const importPersonData = async () => {
  const movieObj = await Movie.find();

  await Promise.all(
    movieObj.map(async (movie) => {
      var arrayWriters = trimValues(movie.Writer);
      var arrayActors = trimValues(movie.Actors);

    
      arrayWriters.map(async (el) => {
        await Person.create({
          Name: el,
          slug: null,
          Role: 'Writer',
          MovieName: movie.Title,
          MovieId: movie._id,
          movie: null
        });
      })
      
    
      arrayActors.map( async (el) => {
        await Person.create({
          Name: el,
          slug: null,
          Role: 'Actors',
          MovieName: movie.Title,
          MovieId: movie._id,
          movie: null
        });
      })
        
    

      await Person.create({
        Name: movie.Director,
        slug: null,
        Role: 'Director',
        MovieName: movie.Title,
        MovieId: movie._id,
        movie: null
      });
    })
  );
};

const trimValues = function (writerString) {
  finalArray = [];
  let newArray = writerString.split(',');
  //newArray.pop();
  newArray.forEach((strn) => {
    if(!finalArray.includes(strn.split(' (')[0])) 
      finalArray.push(strn.split(' (')[0]);
  });
  return finalArray;
};

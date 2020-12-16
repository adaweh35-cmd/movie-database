const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const path = require('path');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const viewRouter = require('./routes/viewRoutes');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const peopleRouter = require('./routes/peopleRoutes');
const reviewRouter = require('./routes/reviewRoutes');
var bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 3) Middlewares
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());



// 3) Routes
// app.use('/api/v1/people', peopleRouter);
app.use('/', viewRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/people', peopleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;

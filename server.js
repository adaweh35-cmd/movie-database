const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful');
  });

const app = require('./app');
console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

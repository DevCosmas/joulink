require('dotenv').config();
const express = require('express');

process.on('uncaughtException', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log('UNCAUGTH EXPECTION! Shutting down...');
  process.exit(1);
});

const { mongoDbConnection } = require('./config');
const studentRoute = require('./routes/studentForm');
const tutorRoute = require('./routes/tutorRoute');
const errorhandler = require('./controller/errorHandler');
const { appError } = require('./utils/appError');
const path = require('path');
const cookieParser = require('cookie-parser');
// const helmet = require('helmet')
// const morgan = require('morgan')

const viewRoute = require('./routes/viewRoutes');

const PORT = process.env.PORT;

const app = express();
mongoDbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log(process.env.NODE_ENV);
// app.use(req,res)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', studentRoute);
app.use('/', viewRoute);
app.use('/api', tutorRoute);

app.all('*', (req, res, next) => {
res.status(404).render('404')
});

app.use(errorhandler);
const server = app.listen(PORT, () => {
  console.log('server is live and listening');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log(err.stack)
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

require('dotenv').config();
const express = require('express');
const { mongoDbConnection } = require('./config');
const studentRoute = require('./routes/studentForm')
const tutorRoute= require('./routes/tutorRoute')
const errorhandler=require('./controller/errorHandler')
const {appError}= require('./utils/appError')
const path = require('path')


// const cookieParser = require("cookie-parser")
// const helmet = require('helmet')
// const morgan = require('morgan')

const viewRoute = require('./routes/viewRoutes')

const  { emailSender }= require('./utils/email')

const PORT = process.env.PORT;

const app = express();
mongoDbConnection();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', studentRoute)
app.use('/api', tutorRoute)
app.use('/', viewRoute)




app.all('*', (req, res, next) => {
    next(new appError('page not found', 404))
});


app.use(errorhandler)
app.listen(PORT, () => {
    console.log('server is live and listening')
})
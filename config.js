require('dotenv').config()
const mongoose = require('mongoose')
const MONGODB_CONNECTION_URL = process.env.MONGODB_URL
const mongoDbConnection = () => {
    mongoose.connect(MONGODB_CONNECTION_URL)
    mongoose.connection.on("connected", () => {

        console.log('Database connected succefully')
    })
    mongoose.connection.on("error", (err) => {
        console.log(`An error has occured ; ${err}`)
    })
}
module.exports = { mongoDbConnection }
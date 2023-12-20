const express = require('express')
const tutorController = require('./../controller/tutorController')
const auth = require('../controller/authController')
const tutorRouter = express.Router()


tutorRouter.use(auth.isAuthenticated)
tutorRouter.use(auth.isLoggedIn)

tutorRouter.post('/sign_Up', tutorController.signUp)
tutorRouter.post('/login', tutorController.Login)
tutorRouter.post('/sendEmail', tutorController.sendEmail)
tutorRouter.patch('/updateProfile', tutorController.updateProfile)
tutorRouter.patch('/updateProfile', tutorController.updateProfile)
tutorRouter.post('/logout', tutorController.logout)



module.exports= tutorRouter
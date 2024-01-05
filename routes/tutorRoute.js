const express = require('express');
const tutorController = require('./../controller/tutorController');
const studentController = require('./../controller/studentController');
const auth = require('../controller/authController');
const tutorRouter = express.Router();

tutorRouter.post(
  '/sign_Up',
  studentController.uploadStudentPhoto,
  tutorController.signUp
);
tutorRouter.post('/login', tutorController.Login);

tutorRouter.post('/sendEmail', auth.isAuthenticated, tutorController.sendEmail);
tutorRouter.patch(
  '/updateProfile',
  auth.isAuthenticated,
  studentController.uploadStudentPhoto,
  tutorController.updateProfile
);
tutorRouter.delete(
  '/deleteAccount',
  auth.isLoggedIn,
  auth.isAuthenticated,
  tutorController.deleteAcct
);
tutorRouter.patch('/reset_password/:token', tutorController.resetPassword);
tutorRouter.post('/forget_password', tutorController.forgetPassword);
tutorRouter.post('/logout', tutorController.logout);
tutorRouter.post(
  '/changePassword',
  auth.isAuthenticated,
  tutorController.changePassword
);

module.exports = tutorRouter;

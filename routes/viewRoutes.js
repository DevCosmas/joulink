const express = require('express');
const router = express.Router();
const { studentModel } = require('./../model/studentSchema');
const { tutorModel } = require('./../model/tutorSchema');
const { appError } = require('.././utils/appError');
const auth = require('../controller/authController');

// const findAllStudent=async (req,res,next)=>{
//     const students= await studentModel.find({})
//     if(!students && student.length===0)next(new appError('no student data was found', 404))
//     res.status(200).json({students})
// }

// const authController = require('./../controller/authController')
// const viewController = require('./../controller/view_controller')

router.get('/', (req, res) => {
  res.status(200).render('app');
});

router.get('/signUp', (req, res) => {
  res.status(200).render('signUp');
});
router.get('/login', (req, res) => {
  res.status(200).render('login');
});

// router.use(authController.isLoggedIn)

// router.get('/overview', (req, res) => {
//     res.status(200).render('studentOverview')
// })
router.get('/sendEmail', auth.isLoggedIn, (req, res) => {
  res.status(200).render('sendEmail');
});
// router.get('/Email',(req,res)=>{
//     res.status(200).render('email')

// })
router.get('/form', (req, res) => {
  res.status(200).render('studentForm');
});
router.get('/overview', auth.isLoggedIn, async (req, res, next) => {
  const students = await studentModel.find({});
  if (!students && students.length === 0)
    next(new appError('no student data was found', 404));
  res.status(200).render('studentOverview', { students });
});

router.get('/resetPassword/:token', async (req, res, next) => {
  res.status(200).render('changePassword');
});

router.get('/Edit_account', auth.isLoggedIn, async (req, res, next) => {
  res.status(200).render('editaccount');
});

router.get('/forgetPassword', async (req, res, next) => {
  res.status(200).render('forgetPassword');
});

router.get('/student_Card/:id', auth.isLoggedIn, async (req, res, next) => {
  try {
    const student = await studentModel.findById(req.params.id);

    if (!student) {
      return next(new appError('No student data was found', 404));
    }
    res.status(200).render('studentCard', { student });
  } catch (error) {
    next(new appError(error, 500));
  }
});

module.exports = router;

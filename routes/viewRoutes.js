const express = require('express')
const router = express.Router()

const {studentModel} = require('./../model/studentSchema')
const  {tutorModel}  = require('./../model/tutorSchema')

const {appError} = require('.././utils/appError')


// const findAllStudent=async (req,res,next)=>{
//     const students= await studentModel.find({})
//     if(!students && student.length===0)next(new appError('no student data was found', 404))
//     res.status(200).json({students})
// }


// const authController = require('./../controller/authController')
// const viewController = require('./../controller/view_controller')



router.get('/', (req, res) => {
    res.status(200).render('app')
})

router.get('/signUp', (req, res) => {
    res.status(200).render('signUp')
})
router.get('/login', (req, res) => {
    res.status(200).render('login')
})
 

// router.use(authController.isLoggedIn)

// router.get('/overview', (req, res) => {
//     res.status(200).render('studentOverview')
// })
router.get('/sendEmail',(req,res)=>{
    res.status(200).render('sendEmail')

})
// router.get('/Email',(req,res)=>{
//     res.status(200).render('email')

// })
router.get('/form',(req,res)=>{
    res.status(200).render('studentForm')

})
router.get('/overview', async (req,res,next)=>{
     const students= await studentModel.find({})
  if(!students && students.length===0)next(new appError('no student data was found', 404))
    res.status(200).render("studentOverview", {students})
})

router.get('/studentProfile/:id', async (req, res, next) => {
    try {
        const student = await studentModel.findById(req.params.id);

        if (!student) {
            return next(new appError('No student data was found', 404));
        }
    res.status(200).render('studentProfile', { student });
    } catch (error) {
        next(error);
    }
});



// router.get('/searchQuery', viewController.queryTask)
module.exports = router
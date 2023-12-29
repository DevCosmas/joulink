const express= require('express')
const studentController= require('.././controller/studentController')

const router= express.Router()
router.post('/student_form',studentController.uploadStudentPhoto, studentController.studentForm)
router.get('/studentEmail', studentController.findStudentEmail)
router.get('/allStudent', studentController.findAllStudent)



module.exports=router
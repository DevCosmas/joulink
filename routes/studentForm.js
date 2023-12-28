const express= require('express')
const studentController= require('.././controller/studentController')

const router= express.Router()
router.post('/student_form', studentController.studentForm)
router.get('/studentEmail', studentController.findStudentEmail)


module.exports=router
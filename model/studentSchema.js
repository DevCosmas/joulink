const mongoose = require('mongoose')
const schema = mongoose.Schema
const studentSchema = new schema({
    firstname: {
        type: String,
        required: [true, 'a student must have a name']
    },
    lastname: {
        type: String,
        required: [true, 'a student must have a name']
    },
    gender:{
type:String,
enum:['male', 'female']
    },
    DOB: {
        type: Date,
        required: [true, 'a student must have a date of birth']
    },
    stateOfOrigin: String,
    
    homeAddress: {
        type: String,
        required: [true, 'a student must have an address']
    },
    course: {
        type: String,
        required: [true, 'a student should  have a course'],
        enum:['web development', 'microsoft office', 'graphic design', 'digital marketing']
    },
    lessonTime:{
        type:String,
        enum:['bi-weekly', 'once a weak']
    },
    paymentMethod:{
        type:String,
        enum:['cash', 'USSD','POS']
    },
    photo: {
        type:String,
        default:"hack-capital-uv5_bsypFUM-unsplash.jpg"
    },
    email:{
        type:String
    }
})

const studentModel = mongoose.model('student', studentSchema)
module.exports = {studentModel}
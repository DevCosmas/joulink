// 

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
    firstname: {
        type: String,
        required: [true, 'A student must have a first name'],
    },
    lastname: {
        type: String,
        required: [true, 'A student must have a last name'],
    },

     DOB: {
        type: Date,
      
    },
    gender: {
        type: String,
      
    },
   
    stateOfOrigin: {
        type: String,
    },
    homeAddress: {
        type: String,
        required: [true, 'A student must have an address'],
    },
    course: {
        type: String,
        required: [true, 'A student should have a course'],
    },
    lessonTime: {
        type: String,
        
    },
    paymentMethod: {
        type: String,
       
    },
    photo: {
        type: String,
        default: "hack-capital-uv5_bsypFUM-unsplash.jpg",
    },
    email: {
        type: String,
    },
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = { studentModel };

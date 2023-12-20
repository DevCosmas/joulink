const {studentModel} = require('./../model/studentSchema')
const {appError} = require('.././utils/appError')
const { jwtToken } = require('.././utils/jwt')
const studentForm = async (req, res, next) => {
    try {
        const formData = req.body
        const newStudent = await studentModel.create(formData)
        const token = await jwtToken(newStudent._id)
        res.status(201).json({ result: 'Success', message: 'a new student has been admitted', token, newStudent })

        if (!newStudent) next(new appError('no  new student was created ', 400))

    } catch (err) {
        next(new appError(err, 500))
    }
}
const findStudentEmail = async (req, res, next) => {
    try {
        const searchStudent = await studentModel.find(req.query);

        if (!searchStudent || searchStudent.length === 0) {
            return next(new appError('No student was found', 404));
        }

        const mappedSearch = searchStudent.map(student => ({
            email: student.email,
            firstname: student.firstname
        }));

        res.status(200).json({ result: 'success', size: mappedSearch.length, data: mappedSearch });
    } catch (err) {
        // console.e   rror('Error finding student email:', err);
        next(new appError('Internal server error', 500));
    }
};

module.exports = { findStudentEmail };

module.exports = {
    studentForm,
    findStudentEmail
}
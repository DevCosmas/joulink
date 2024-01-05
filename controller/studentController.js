const { studentModel } = require('./../model/studentSchema');
const { appError } = require('.././utils/appError');
const { jwtToken } = require('.././utils/jwt');
const multer = require('multer');
const EmailSender = require('./../utils/email');
const sendMail = new EmailSender();
// const sharp= require('sharp')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    cb(null, `student-${Date.now()}.${ext}`);
  },
});

// const multerStorage=multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Not an image. Please Uploaad an image', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadStudentPhoto = upload.single('photo');
const studentForm = async (req, res, next) => {
  try {
    // console.log(req.file);
    const formData = req.body;
    if (req.file) formData.photo = req.file.filename;
    const newStudent = await studentModel.create(formData);
    if (!newStudent) next(new appError('no  new student was created ', 400));
    const url = `${req.protocol}://${req.get('host')}/confirmEmail/${
      newStudent._id
    }`;

    console.log(newStudent._id);
    await sendMail.sendWelcomeEmail(newStudent, url);
    const token = await jwtToken(newStudent._id);
    res.status(201).json({
      result: 'Success',
      message: 'Registration is succesfull',
      token,
      newStudent,
    });
  } catch (err) {
    next(new appError(err, 500));
  }
};
const findStudentEmail = async (req, res, next) => {
  try {
    const searchStudent = await studentModel.find(req.query);

    if (!searchStudent || searchStudent.length === 0) {
      next(new appError('No student was found', 404));
    }

    const mappedSearch = searchStudent.map((student) => ({
      email: student.email,
      firstname: student.firstname,
    }));

    res.status(200).json({
      result: 'success',
      size: mappedSearch.length,
      data: mappedSearch,
    });
  } catch (err) {
    next(new appError('Internal server error', 500));
  }
};

const findAllStudent = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.firstname) {
      const nonCaseSensitive = new RegExp(req.query.firstname, 'i');
      query = { firstname: nonCaseSensitive };
    }

    const students = await studentModel.find(query);

    if (!students || students.length === 0) {
      return next(new appError('No student was found', 404));
    }

    return res.status(200).json({
      result: 'success',
      message: 'See the list of students',
      size: students.length,
      students,
    });
  } catch (err) {
    next(new appError(err, 500));
  }
};

const confirmEmail = async (req, res, next) => {
  const confirmStudent = await studentModel.findOne({ _id: req.params.id });
  if (!confirmStudent) next(new appError('Email was not confirmed', 404));

  res.status(200).json({
    result: 'sucesss',
    message: 'Your email confirmation is complete',
  });
};

module.exports = {
  studentForm,
  findStudentEmail,
  findAllStudent,
  uploadStudentPhoto,
  confirmEmail,
};

// const nodemailer = require("nodemailer");
// const {appError} = require('./appError');

// const emailSender = async (message, user) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: user.email,
//       subject: "Welcome to the blog",
//       text: message,
//     };


//     const info = await transporter.sendMail(mailOptions);
//     return info;
//   } catch (error) {

//     const emailError = new appError('Email could not be sent', 500);
//     console.error('Email error:', error);
//     throw emailError;
//   }
// };

// module.exports = {emailSender};
require('dotenv').config()

const nodemailer = require("nodemailer");
const { appError } = require('./appError');

const emailSender = async (message,heading, users) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const toAddresses = users.map(user => user.email);

    console.log(toAddresses)

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: toAddresses,
      subject: heading,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.response)
    return info;
  } catch (error) {
    const emailError = new appError('Email could not be sent', 500);
    console.error('Email error:', error);
    throw emailError;
  }
};

module.exports = { emailSender };

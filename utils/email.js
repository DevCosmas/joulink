
// // require('dotenv').config();
// // const nodemailer = require('nodemailer');
// // const ejs = require('ejs');
// // const path = require('path');
// // const { appError } = require('./appError');

// // const emailSender = async (message, heading, users) => {
// //   try {
// //     const transporter = nodemailer.createTransport({
// //       service: 'Gmail',
// //       auth: {
// //         user: process.env.EMAIL_USERNAME,
// //         pass: process.env.EMAIL_PASSWORD,
// //       },
// //     });

// //     // const toAddresses = users.map((user) => user.email);
// //     // const firstNames=users.map(user=>user.firstname)
// //     for (const user of users) {
// //       const toAddress = user.email;
// //       const firstname = user.firstname;

// //     // Load the EJS template
// //     const templatePath = path.join(__dirname, "../views/email.ejs");
// //     const template = await ejs.renderFile(templatePath, { message, firstname,heading});

// //     const mailOptions = {
// //       from: process.env.EMAIL_USERNAME,
// //       to: toAddress,
// //       subject: heading,
// //       text: message, 
// //       html: template, 
// //     };
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log(info.response);
// //     return info;
// //   }
   
// //   } catch (error) {
// //     const emailError = new appError('Email could not be sent', 500);
// //     console.error('Email error:', error);
// //     throw emailError;
// //   }
// // };

// // module.exports = { emailSender };

// require('dotenv').config();
// const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');
// const { appError } = require('./appError');

// const emailSender = async (message, heading, users) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     for (const user of users) {
//       const toAddress = user.email;
//       const firstname = user.firstname;

//       console.log(toAddress)
//       console.log(firstname)

//       // Load the EJS template
//       const templatePath = path.join(__dirname, '../views/email.ejs');
//       const template = await ejs.renderFile(templatePath, { message, firstname, heading });

//       const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: toAddress,
//         subject: heading,
//         text: message,
//         html: template,
//       };

//       const info = await transporter.sendMail(mailOptions);
//       console.log(info.response);
//     }

//     // Move the return statement outside of the for loop
//     return 'All emails sent successfully';
//   } catch (error) {
//     const emailError = new appError('Emails could not be sent', 500);
//     console.error('Email error:', error);
//     throw emailError;
//   }
// };

// module.exports = { emailSender };

require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { appError } = require('./appError');

const emailSender = async (message, heading, users) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    for (const user of users) {
      try {
        const toAddress = user.email;
        const firstname=user.firstname
        if (!toAddress) {
          console.error('Invalid user email:', user);
          continue;
        }

        const templatePath = path.join(__dirname, '../views/email.ejs');
        const template = await ejs.renderFile(templatePath, { message, firstname, heading });

        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: toAddress,
          subject: heading,
          text: message,
          html: template,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', toAddress);
      } catch (error) {
   new appError(error, 500);
   
        
      }
    }

    return 'All emails sent successfully';
  } catch (error) {
     new appError(error, 500);
    }
};

module.exports = { emailSender };

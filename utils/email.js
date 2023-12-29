
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
    new appError(error, 500)
    }
};

module.exports = { emailSender };

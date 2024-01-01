const crypto = require('crypto');
const { tutorModel } = require('./../model/tutorSchema');
const { studentModel } = require('./../model/studentSchema');
const { jwtToken } = require('./../utils/jwt');
const { appError } = require('./../utils/appError');
const EmailSender = require('./../utils/email');
const sendMail = new EmailSender();

async function signUp(req, res, next) {
  try {
    const body = req.body;
    if (req.file) body.photo = req.file.filename;
    const newUser = await tutorModel.create(body);
    if (!newUser) {
      return next(new appError('fill in the correct details pls', 400));
    }

    const token = await jwtToken(newUser._id);

    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({
      result: 'SUCCESS',
      Message: 'You have succesfully signed Up',
      token,
      tutorProfile: newUser,
    });
  } catch (err) {
    next(new appError(err, 500));
  }
}
async function Login(req, res, next) {
  try {
    const loginDetails = req.body;
    // confirm if user exist
    const isValidUser = await tutorModel.findOne({ email: loginDetails.email });
    if (!isValidUser) {
      return next(new appError('this user is not found. kindly sign up', 404));
    }
    // compare user password
    const isValidPassowrd = await isValidUser.isValidPassword(
      loginDetails.password,
      isValidUser.password
    );

    if (!isValidPassowrd) {
      return next(new appError('invalid password or email', 401));
    }
    // generate a token for use
    const token = await jwtToken(isValidUser._id);

    res.cookie('jwt', token, { httpOnly: true });
    // console.log(req.cookies)
    res.status(200).json({
      result: 'SUCCESS',
      Message: 'You are logged in now',
      token,
      user: isValidUser,
    });
  } catch (err) {
    next(new appError(err, 500));
  }
}

async function updateProfile(req, res, next) {
    try {
      const updatesDetails = req.body;
      const updatedUser = await tutorModel.findByIdAndUpdate(
        req.user._id,
        updatesDetails,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!updatedUser) {
        return next(new appError('This user was not updated', 404));
      }
  
      res.status(200).json({
        result: 'Success',
        message: 'User details have been successfully updated',
        updatedUser,
      });
    } catch (err) {
      next(new appError(err, 500));
    }
  }
  
  async function deleteAcct(req, res, next) {
    try {
      const deleteUser = await tutorModel.findByIdAndDelete(req.user._id);
      
      if (deleteUser) {
        return res
          .status(203)
          .json({ result: 'Success', message: 'Account deletion successful' });
      }
    } catch (err) {
      next(new appError(err, 500));
    }
  }
  

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  });

  return res
    .status(200)
    .json({ message: 'You have been successfully logged out' });
};
const sendEmail = async (req, res, next) => {
  try {
    const emails = JSON.parse(req.body.emails);
    const emailHeading = req.body.emailHead;
    const emailContent = req.body.emailBody;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      res
        .status(400)
        .json({ result: 'error', message: 'Invalid or empty email list' });
    }

    await sendMail.sendGeneralEmail(emailContent, emailHeading, emails);
    res
      .status(200)
      .json({ result: 'success', message: 'Email was sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    next(new appError(error, 500));
  }
};
const forgetPassword = async (req, res, next) => {
  try {
    const user = await tutorModel.findOne({ email: req.body.email });
    if (!user) {
      throw new appError('This user does not exist', 404);
    }

    const resetToken = await user.createResetToken();
    const url = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

    console.log(resetToken);

    await sendMail.sendPasswordResetEmail(user, resetToken, url);
    await user.save({ validateBeforeSave: false });
    
    res.status(200).json({
      statusP:'sucess',
      message: 'Your password reset token has been sent. Check your mailbox.',
    });
  } catch (err) {
    next(new appError(err, 500));
  }
};


const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = await crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await tutorModel.findOne({
      resetPasswordToken: hashedToken,
      resetTimeExp: { $gt: Date.now() },
    });
    if (!user) return next(new appError('invalid token or expired token', 404));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    user.resetPasswordToken = undefined;
    user.resetTimeExp = undefined;

    await user.save();
    const token = await jwtToken(user._id);
    res.cookie('jwt', token, { httpOnly: true });
    res
      .status(200)
      .json({ message: 'a new pasword has been set', token, user });
  } catch (err) {
    next(new appError(err, 500))
  }
};

module.exports = {
  signUp,
  updateProfile,
  deleteAcct,
  Login,
  logout,
  sendEmail,
  resetPassword,
  forgetPassword
};

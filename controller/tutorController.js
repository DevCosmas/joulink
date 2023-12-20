const  {tutorModel}  = require('./../model/tutorSchema')
const {studentModel} = require('./../model/studentSchema')
const { jwtToken } = require('./../utils/jwt')
const {appError }= require('./../utils/appError')
const {emailSender}= require('./../utils/email')


async function signUp(req, res, next) {
    try {
        const body = req.body
        const newUser = await tutorModel.create(body)
        if (!newUser) {
            return next(new appError('fill in the correct details pls', 400))
        }

        const token = await jwtToken(newUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ result: "SUCCESS", Message: 'You have succesfully signed Up', token, tutorProfile: newUser })
    } catch (err) {
        next(new appError(err, 500))
    }
}
async function Login(req, res, next) {
    try {
        const loginDetails = req.body
        // confirm if user exist
        const isValidUser = await tutorModel.findOne({ email: loginDetails.email })
        if (!isValidUser) {
            return next(new appError('this user is not found. kindly sign up', 404))
        }
        // compare user password
        const isValidPassowrd = await isValidUser.isValidPassword(loginDetails.password, isValidUser.password)


        if (!isValidPassowrd) {
            return next(new appError('invalid password or email', 401))
        }
        // generate a token for use
        const token = await jwtToken(isValidUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        // console.log(req.cookies)
        res.status(200).json({ result: "SUCCESS", Message: 'You are logged in now', token, user: isValidUser })
    } catch (err) {
        next(new appError(err, 500))
    }
}


async function updateProfile(req, res, next) {
    try {
        const updatesDetails = req.body
        const updatedUser = tutorModel.findByIdAndUpdate(req.user, updatesDetails, { new: true, runValidators: true })
        if (updatedUser) res.status(200).json({ result: "Success", message: 'user details has been succefully updated' })
    } catch (err) {
        next(new appError(err, 500))
    }

}
async function deleteAcct(req, res, next) {
    try {

        const deleteUser = await userModel.findByIdAndUpdate(req.user)
        if (deleteUser) res.status(203).json({ result: "Success", message: 'Account deletion successful' })
    } catch (err) {
        next(new appError(err, 500))
    }

}

const logout = (req, res) => {


    res.clearCookie('jwt', {
        httpOnly: true
    })

    return res.status(200).json({ message: 'You have been successfully logged out' });
};
const sendEmail = async (req, res, next) => {
    try {
        const emails = req.body.emails; 
        const emailHeading = req.body.emailHead;
        const emailContent = req.body.emailBody;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ result: "error", message: "Invalid or empty email list" });
        }

        await emailSender(emailContent, emailHeading, emails);
        res.status(200).json({ result: "success", message: "Email was sent successfully" });
    } catch (error) {
        console.error('Error sending email:', error);
        next(new appError('500', 'Something went really wrong. Try again later'));
    }
};





module.exports = { signUp, updateProfile, deleteAcct, Login, logout, sendEmail}
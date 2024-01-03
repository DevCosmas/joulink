const jwt = require('jsonwebtoken');
const { tutorModel } = require('./../model/tutorSchema');
const { appError } = require('./../utils/appError');

const isAuthenticated = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
         
            return next();
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return next(new appError('Token has expired', 401));
        }

   
        const user = await tutorModel.findById(decodedToken.id);

        if (user) {
            req.user = user;
        }
    } catch (err) {
        return next(new appError(err.message, 500));
    }

    next();
};



const isLoggedIn = async (req, res, next) => {
    try {
        if (!req.cookies.jwt) {
            return next(new appError('kindly login or sign up', 401))
        }
        else if (req.cookies.jwt) {
            const decodedToken = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
            const date = new Date
            const time = parseInt(date.getTime() / 1000)
            const user = await tutorModel.findById(decodedToken.id)

            console.log(req.cookies)

            if (user && decodedToken.iat < time)
                res.locals.user = user
            return next()
        }

        next()

    } catch (error) {
        next(new appError(error, 500))
    }

}


module.exports = { isAuthenticated, isLoggedIn }
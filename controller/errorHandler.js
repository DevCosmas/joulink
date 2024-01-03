
const { appError } = require('../utils/appError');

const handleTokenExpire=(err,res)=>{
  new appError('Your session is Expired. LogIn again!')
  return res.json(200).render('login')
}
const handleCastError = (err) => {
  const value= err.error.value
  const message = `${value} is an Invalid Input`;
  return new appError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
  const refinedValue=value.split("\"")[1]
  const message = `${refinedValue} is already registered`;
  return new appError(message, 400);
};

const handleValidatorError = (err) => {
  const message= err.message.split(':')[2]
  return new appError(message, 400)
};

const handleJwtError=(err)=>{
  const message= err.error.message
  return new appError(message, 400)
}

const handleOtherError=(err)=>{
  return new appError(err.message,500)
}
const errorDev = (error, res) => {
  res.status(error.statusCode).json({
    result: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};

const errorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      result: error.status,
      message: error.message,
    });
  } else {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Unexpected Error occurred' });
  }
};

//

module.exports = function errorhandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    const devError = error;
    errorDev(devError, res);
    return;
  }
if(process.env.NODE_ENV==='production'){
  try {
    // console.log(error);
    // console.log(error.error);
    // console.log(error.error.name);

    if (error.error === 'ValidationError' ||(error.error && error.error.name === 'ValidationError')) {
      const validateErr = handleValidatorError(error);
      errorProd(validateErr, res);
    } else if (error.error.name === 'CastError') {
      const castErr = handleCastError(error);
      errorProd(castErr, res);
    } else if (
      error.code === 11000 ||
      (error.error && error.error.code === 11000)
    ) {
      const duplicateErr = handleDuplicateFields(error);
      errorProd(duplicateErr, res);
    }else if(error.error.name="JsonWebTokenError"){
      const jwtErr = handleJwtError(error);
      errorProd(jwtErr, res);
    }else if(error.error.name==='TokenExpiredError'){
      const tokenErr=handleTokenExpire(error,res)
      errorProd(token,res)
    }
     else {
      const otherErr= handleOtherError(error)
      errorProd(otherErr,res)
      // console.error(error);
      // const genericErr = new appError('Internal Server Error', 500);
      // errorProd(genericErr, res);
    }
  } catch (err) {
     new appError(err, 500);
    // console.log(genericErr)
    // console.log(handledError)
    // errorProd(genericErr, res);
  }

}
  
  next();
};

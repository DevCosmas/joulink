module.exports= function errorhandler(error, req,res,next){
    error.statusCode= error.statusCode || 500
    error.status=error.status||'error'

    res.status(error.statusCode).json({
        result:error.status,
        message:error.message,
        error
        
    })
}
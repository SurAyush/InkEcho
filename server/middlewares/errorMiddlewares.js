//Route not found error
const notFound = (req,res,next)  => {
    const error = new Error(`${req.originalUrl} not found`);
    res.status(404);
    next(error);
}

//General middleware for handling errors
const errorHandler = (err,req, res, next) => {
    if(res.headerSent)
        return next(err);
    const error = new Error('Something went wrong');
    res.status(err.code||500).json({message: err.message||"An unknown error occurred"});
}

module.exports = {notFound, errorHandler};
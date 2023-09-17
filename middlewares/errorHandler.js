module.exports = function () {
  return function errorHandler(err, req, res, next) {
    //TODO: Can be enhance to store into Error Log file
    const CustomError = require('../models/general/customError')

    if (err) {
      console.error(err);

      let statusCode = 500;
      let errorMessage = 'Internal Server Error';
      if(err.status && err.message){
        statusCode = err.status;
        errorMessage = err.message;
      }
      else if (err instanceof CustomError) {
        statusCode = err.code || statusCode;
        errorMessage = err.message || errorMessage;
      }
      res.status(statusCode).json({
        error: errorMessage
      });
    }
  }
}
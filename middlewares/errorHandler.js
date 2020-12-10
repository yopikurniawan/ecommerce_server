module.exports = function(err, req, res, next) {
// console.log("🚀 ~ file: errorHandler.js ~ line 2 ~ err", err)
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error!"
  
    switch(err.name) {
      case "SequelizeValidationError":
        statusCode = 400
        message = err.errors[0].message
        break;
      case "SequelizeUniqueConstraintError":
        statusCode = 400
        message = err.errors[0].message
        break;
      case "SequelizeForeignKeyConstraintError":
        statusCode = 400
        message = 'ForeignKey error!' 
        break;
      case "BadRequestError":
        statusCode = 400
        message = 'email or password is incorrect'
        break;
      case "ProxyAuthenticationRequiredError":
      case "NotFoundError":
      case "UnauthorizedError":
        statusCode = err.statusCode
        message = err.message
        break;
    }
    statusCode === 500 && console.log(err.stack, '🛑')
    res.status(statusCode).json({message})
  }
  
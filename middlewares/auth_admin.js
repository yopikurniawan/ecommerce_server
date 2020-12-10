const {User, Product} = require('../models')
const {verifyToken} = require('../helpers/jwt')
const createError = require('http-errors')

class Auth {
  static async authentication(req, res, next) {
    try {
      const {access_token} = req.headers
      if (!access_token) {
        throw createError(407, 'Authentication required')
      } else {
        const decoded = verifyToken(access_token)
        const user = await User.findOne({where: {email: decoded.email}})
        
        if (!user) {
          throw createError(407, 'Authentication required')
        } else {
          req.loggedInUser = decoded
          next()
        }
      }
    } catch (error) {
      next(error) 
    }
  }

  static async authorizationProduct(req, res, next) {
    const id = +req.params.id
    try {
      if (id) {
        const product = await Product.findByOne({where: {id}})
  
        if (req.loggedInUser.email !== 'admin@mail.com') { //! expectation checking by role, but undefined get role == admin
          throw createError(401, 'You are not authorized')
        } else if (!product) throw createError(404, 'product not found!')
         else next()
      } else {
        if (req.loggedInUser.email !== 'admin@mail.com') {
          throw createError(401, 'You are not authorized')
        } else next()
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth
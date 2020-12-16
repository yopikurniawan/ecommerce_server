const {User, Cart} = require('../models')
const {verifyToken} = require('../helpers/jwt')
const createError = require('http-errors')

class Auth {
  static async authentication (req, res, next) {
    try {
      const {access_token} = req.headers
      if (!access_token) {
        throw createError(407, 'Authentication required')
      } else {
        const decoded = verifyToken(access_token)
        const user = await User.findOne({
          where: {
            email: decoded.email
          }
        })
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

  static async authorization (req, res, next) {
    try {
      const id = +req.params.id
      const UserId = +req.loggedInUser.id
      const cart = await Cart.findOne({where: {id}})

      if (!cart) {
        throw createError(404, 'banner not found!')
      } else if (cart.UserId !== UserId) {
        throw createError(401, 'You are not authorized')
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth
const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
const createError = require('http-errors')

class UserController {
  static async loginAdmin (req, res, next) {
    try {
			const {email, password} = req.body
			if (!email || !password) throw ({statusCode: 400, message: 'complete all forms'})

			const user = await User.findOne({where: {email}})
			if (!user || !comparePassword(password, user.password)) {
				throw createError(400, 'email or password is incorrect')
			} else {
				const payload = {id: user.id, email: user.email}
				const token = signToken(payload)
				res.status(200).json({access_token: token})
			}
		} catch (error) {
			next(error)
		}
	}
	
	static async register (req, res, next) {
		try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.create(payload)

      const data = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }

      const token = signToken(data)
      res.status(201).json({
        access_token: token,
        user: data
      })
    } catch (err) {
      next(err)
    }
	}

	static async loginCustomer (req, res, next) {
		try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email,
          role: 'customer'
        }
      })

      if (!user) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else if (!comparePassword(payload.password, user.password)) {
        throw {
          msg: 'email or password is incorrect',
          status: 401
        }
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
        const token = signToken(payload)
        res.status(200).json({
          access_token: token,
          user: payload
        })
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
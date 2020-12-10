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
			const {username, email, password} = req.body
			const user = await User.create({username, email, password})
			res.status(201).json(user)
		} catch (error) {
			next(error)
		}
	}

	static async loginCustomer (req, res, next) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({where: {email}})

			if (!user || !comparePassword(password, user.password)) {
				throw createError(400, 'username or password is incorrect')
			} else {
				const payload = {id: user.id, email: user.email}
				const token = signToken(payload)
				res.status(200).json({access_token: token})
			}
		} catch (error) {
			next(error)
		}
	}
}

module.exports = UserController
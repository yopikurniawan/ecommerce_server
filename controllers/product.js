const {Product} = require('../models')

class ProductController {
  static async create (req, res, next) {
    try {
      const {name, image_url, price, stock} = req.body
      const product = await Product.create({name, image_url, price, stock})
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const products = await Product.findAll()
      res.status(200).json({products})
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res, next) {
    try {
      const id = +req.params.id
      const product = await Product.findByPk(id)

      if (product) res.status(200).json({product})
      else throw ({statusCode: 404, message: 'Product not found bro'})
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const id = +req.params.id
      const {name, price, image_url, stock} = req.body
      const updated = await Product.update({name, price, image_url, stock}, {where: {id}, returning: true})
      
      if (updated[0] == 1) res.status(200).json(updated[1][0])
      else throw ({statusCode: 404, message: 'Update product failed'})
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = +req.params.id
      const destroyed = await Product.destroy({where: {id}})

      if (destroyed == 1) res.status(200).json({message: 'Delete product successfuly'})
      else throw ({statusCode: 404, message: 'Delete product failed'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
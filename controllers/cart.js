const {Product, Cart, History} = require('../models')
const sendMail = require('../helpers/nodemailer')

class CartController {
  static async showAll (req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: +req.loggedInUser.id
        },
        include: Product,
        attributes: ['id', 'UserId', 'ProductId', 'quantity']
      })
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }

  static async updateCart (req, res, next) {
    try {
      const UserId = +req.loggedInUser.id
      const {ProductId, quantity} = req.body

      const cart = await Cart.findOne({
        where: {
          UserId,
          ProductId
        }
      })
      const product = await Product.findByPk(ProductId)

      if (!cart) {
        const newCart = await Cart.create({
          UserId,
          ProductId,
          quantity: 1
        })
        res.status(201).json(newCart)
      } else {
        if (product.stock < (cart.quantity + quantity)) {
          throw ({statusCode: 400, message: 'Limit Reached'})
        } else if (cart.UserId !== UserId) {
          throw ({statusCode: 401, message: 'Not Authorized'})
        } else {
          const updated = await Cart.increment('quantity', {
            by: +quantity,
            where: {
              UserId,
              ProductId
            },
            returning: true
          })
          if (updated[0][1] !== 1) {
            throw ({statusCode: 404, message: 'Update Cart Failed'})
          } else {
            res.status(200).json(updated[0][0][0])
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async removeCart (req, res, next) {
    try {
      const id = +req.params.id
      const destroyed = await Cart.destroy({
        where: {
          id
        }
      })
      if (destroyed !== 1) {
        throw { status: 404, msg: 'Delete Cart Failed' }
      } else {
        res.status(200).json({ message: 'Remove cart success' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    try {
      const UserId = +req.loggedInUser.id
      const { total } = req.body

      let checked_out = await Cart.findAll({
        where: {
          UserId
        },
        include: Product
      })
      checked_out = checked_out.map(item => item.dataValues)

      let item_list = ''
      checked_out.forEach(el => {
        item_list += `<li> ${el.Product.name} X ${el.quantity} </li>`
      })
      
      const payload = {
        recipient: req.loggedInUser.email, 
        subject: 'Thank You For Shopping', 
        html: `
        <header>SHOPING</header>
        <h1>Here are the list of item that you recently bought</h1>
        <ul>
          ${item_list}
        </ul>
        <h4>Total: <strong>${total}</strong></h4>
        <footer>
          <p>We look forward to your next purchase!</p>
          <i>Warm Regards, SHOPING</i>
        </footer>` 
      }
      for (const item of checked_out) {
        await Product.decrement('stock', {
          by: item.quantity,
          where: {
            id: item.ProductId
          }
        })
      }
      await History.bulkCreate(checked_out)
      const destroyed = await Cart.destroy({
        where: {
          UserId
        }
      })
      if (destroyed >= 1) {
        sendMail(payload)
        res.status(200).json({ message: 'Checked out successfullly' })
      } else {
        throw ({ statusCode: 400, message: 'Checkout failed' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getHistory (req, res, next) {
    try {
      const UserId = +req.loggedInUser.id

      const history = await History.findAll({
        where: {
          UserId
        },
        include: Product
      })
      res.status(200).json(history)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController
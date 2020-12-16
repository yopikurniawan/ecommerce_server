const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart')
const Auth = require('../middlewares/auth_customer')

router.use(Auth.authentication)

router.get('/', CartController.showAll)
router.get('/history', CartController.getHistory)
router.post('/', CartController.updateChart)
router.delete('/checkout', CartController.checkout)

router.delete('/:id', Auth.authorization, CartController.removeCart)

module.exports = router
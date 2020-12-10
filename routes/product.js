const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const Auth = require('../middlewares/auth_admin')

router.get('/', ProductController.show)
router.use(Auth.authentication)
router.post('/', Auth.authorizationProduct, ProductController.create)
router.get('/:id', ProductController.getOne)
router.use(Auth.authorizationProduct)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router
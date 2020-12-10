const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./product')

router.use(userRouter)
router.use('/products', productRouter)

module.exports = router
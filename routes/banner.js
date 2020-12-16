const express = require('express')
const router = express.Router()
const BannerController = require('../controllers/banner')
const Auth = require('../middlewares/auth_admin')

router.get('/', BannerController.showAll)
router.get('/active', BannerController.getActiveBanner)

router.use(Auth.authentication)

router.get('/:id', BannerController.getOne)
router.post('/', BannerController.addBanner)

router.use('/:id', Auth.authorization_banner)

router.put('/:id', BannerController.updateBanner)
router.delete('/:id', BannerController.deleteBanner)

module.exports = router
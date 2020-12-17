const {Banner} = require('../models')

class BannerController {
  static async addBanner (req, res, next) {
    try {
      const {image_url, status} = req.body
      const payload = {image_url, status}
      
      const banner = await Banner.create(payload)
      res.status(201).json(banner)
    } catch (error) {
      next(error)
    }
  }

  static async showAll (req, res, next) {
    try {
      const banners = await Banner.findAll({
        order: [['id', 'asc']]
      })
      res.status(200).json(banners)
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res, next) {
    try {
      const id = +req.params.id
      const banner = await Banner.findByPk(id)

      if (!banner) {
        throw ({statusCode: 404, message: 'Banner not found'})
      } else {
        res.status(200).json(banner)
      }
    } catch (error) {
      next(error)
    }
  }

  static async getActiveBanner (req, res, next) {
    try {
      const active_banner = await Banner.findAll({
        where: {status: 'active'}
      })
      res.status(200).json(active_banner)
    } catch (error) {
      next(error)
    }
  }

  static async updateBanner (req, res, next) {
    try {
      const id = +req.params.id
      const {image_url, status } = req.body
      const payload = {image_url, status}
      const updated = await Banner.update(payload, {where: {id}, returning: true})

      if (updated[0] !== 1) {
        throw ({statusCode: 404, message: 'Update banner failed'})
      } else {
        res.status(200).json(updated[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner (req, res, next) {
    try {
      const id = +req.params.id
      const destroyed = await Banner.destroy({where: {id}})

      if (destroyed !== 1) {
        throw ({statusCode: 404, message: 'Update product failed'})
      } else {
        res.status(200).json({message: 'Delete product successfuly'})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BannerController
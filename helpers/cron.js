const cron = require('node-cron')
const { Banner } = require('../models')

const changeBanner = () => {
  cron.schedule('0 0 */1 * *', async () => {
    try {
      const count = await Banner.count('id')
      const random = Math.ceil(Math.random() * count)
      let second_random = 0
      if (random === count) {
        second_random = random - 1
      } else if (random === 1) {
        second_random = random + 1
      } else {
        second_random = random + 1
      }
      await Banner.update({
        status: 'inactive'
      }, {
        where: {
          id: second_random
        }
      })
      await Banner.update({
        status: 'active'
      }, {
        where: {
          id: random
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  })  
}

module.exports = changeBanner
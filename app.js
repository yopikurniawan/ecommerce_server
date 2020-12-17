if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const changeBanner = require('./helpers/cron')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

changeBanner()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
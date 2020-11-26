const helmet = require('helmet')
const bodyParser = require('body-parser')
const express = require('express')
const config = require('../config').config
const glob = require('glob')
const path = require('path')
const cors = require('cors')

module.exports.initServer = initServer
module.exports.initMiddlewares = initMiddlewares

function initServer () {
  const app = express()
  initMiddlewares(app)
  initRoutes(app)
  app.listen(config.port, () => console.log(`App listening on http://localhost:${config.port}`))
}

function initMiddlewares (app) {
  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
}

function initRoutes (app) {
  glob.sync(path.join(__dirname, '../api/**/*.route.js')).forEach(routeFile => {
    require(routeFile)(app)
  })
}

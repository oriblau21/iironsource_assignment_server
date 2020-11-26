const { getApps } = require('./app.controller')

module.exports = (app) => {
  app.get('/api/app', getApps)
}

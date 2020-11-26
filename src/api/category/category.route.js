const { getCategories } = require('./category.controller')

module.exports = (app) => {
  app.get('/api/category', getCategories)
}

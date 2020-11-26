const fsextra = require('fs-extra')
const path = require('path')

module.exports.getCategories = getCategories

async function getCategories (req, res) {
  try {
    const categories = await fsextra.readJSON(path.join(__dirname, '../../../data/categories.json'))
    res.json(categories)
  } catch (err) {
    console.log(err)
  }
}

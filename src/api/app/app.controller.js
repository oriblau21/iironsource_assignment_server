const { queryApps } = require('./app.service')
const { isArray } = require('lodash')
module.exports.getApps = getApps

async function getApps (req, res) {
  let { freeText, birthYear, preferredCategories, minAppRating } = req.query
  birthYear = parseInt(birthYear, 10) || null
  minAppRating = parseFloat(minAppRating, 10) || null

  if (preferredCategories && !isArray(preferredCategories)) {
    preferredCategories = [preferredCategories]
  }

  try {
    const filtredApps = await queryApps(freeText, birthYear, preferredCategories, minAppRating)
    res.json(filtredApps)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Error occured during filtering apps'
    })
  }
}

const fsextra = require('fs-extra')
const path = require('path')

module.exports.queryApps = queryApps

async function queryApps (freeText, birthYear, preferredCategories, minAppRating) {
  let filteredApps = await fsextra.readJSON(path.join(__dirname, '../../../data/apps.json'))
  filteredApps = filteredApps.filter(app => {
    if (birthYear) {
      const currentYear = new Date().getFullYear()

      if (currentYear - birthYear < app.min_age) {
        return false
      }
    }

    if (preferredCategories &&
        preferredCategories.length) {
      const ifAppHasSomeOfThePreffredCategories = preferredCategories.some(category => category.toLocaleLowerCase() === app.category.toLocaleLowerCase())

      if (!ifAppHasSomeOfThePreffredCategories) {
        return false
      }
    }

    if (minAppRating && app.rating < minAppRating) {
      return false
    }

    if (freeText && !JSON.stringify().toLocaleLowerCase().includes(freeText)) {
      return false
    }

    return true
  })

  return filteredApps
}

const BaseController = require('./base-controller')
const User = require('../lib/entities').User

const B64_REGEX = new RegExp(
  '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$'
)

class UserController extends BaseController(User) {
  static retrievePassword (req, res, next) {
    const encPassword = req.get('encp')

    if (!encPassword) {
      next()
    }

    if (!B64_REGEX.test(encPassword)) {
      return next(new TypeError('Not a base64 string'))
    }

    try {
      req.body.password = Buffer.from(encPassword, 'base64').toString('ascii')
    } catch (e) {
      return next()
    }
  }

  static retrieveData (req, res, next) {
    req.data = req.body
  }

  static retrieveOptions (req, res, next) {
    let options = {}
    options.limit = req.body.limit || 100
    options.skip = req.body.skip || 0
    return options
  }
}

module.exports = UserController

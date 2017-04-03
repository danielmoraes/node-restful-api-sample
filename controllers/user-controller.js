const BaseController = require('./base-controller')
const User = require('../lib/entities').User

class UserController extends BaseController(User) {
  static retrieveData (req, res, next) {
    let data = {}

    const encPassword = req.get('encp')

    if (encPassword) {
      try {
        const password = Buffer.from(encPassword, 'base64').toString('ascii')
        data['hash'] = User.hashPassword(password)
      } catch () {}
    }

    User.getPublicKeys().forEach(function(key) {
      if (key in req.body) {
        data[key] = req.body[key]
      }
    })

    req.data = data
  }

  static retrieveOptions (req, res, next) {
    let options = {}
    options.limit = req.body.limit || 100
    options.skip = req.body.skip || 0
    return options
  }
}

module.exports = UserController

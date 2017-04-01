const Controller = require('./controller')
const bcrypt = require('bcrypt')
const UserRepository = require('../repositories').UserRepository

const SALT_ROUNDS = 13

class UserController extends Controller(UserRepository) {
  static retrievePassword (req, res, next) {
    const encPassword = req.get('encp')

    if (!encPassword) {
      return next()
    }

    try {
      var password = Buffer.from(encPassword, 'base64').toString('ascii')
    } catch (err) {
      return next()
    }

    bcrypt
      .hash(password, SALT_ROUNDS)
      .then((hash) => {
        req.body.password = hash
        return next()
      })
      .catch(next)
  }
}

module.exports = UserController

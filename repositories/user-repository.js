const db = require('../models/sequelize')

const PUBLIC_FIELDS = [ 'email', 'firstName', 'lastName' ]

class UserRepository {
  static create(data) {
    return db.User.create(data)
      .then(instance => UserRepository.getOne(instance.id))
  }

  static getOne(userId) {
    return db.User.findById(userId, {
      attributes: ['id'].concat(PUBLIC_FIELDS)
    })
  }

  static getAll() {
    return db.User.findAll({
      attributes: ['id'].concat(PUBLIC_FIELDS)
    })
  }

  static update(userId, data) {
    let values = {}
    PUBLIC_FIELDS.forEach(field => {
      values[field] = data[field] || null
    })

    return db.User.update(values, { where: { id: userId }, })
      .then(() => UserRepository.getOne(userId))
  }

  static merge(userId, data) {
    let values = {}
    PUBLIC_FIELDS.forEach(field => {
      if (data[field]) {
        values[field] = data[field]
      }
    })

    return db.User.update(values, { where: { id: userId }, })
      .then(() => UserRepository.getOne(userId))
  }

  static destroy(userId) {
    return db.User.destroy({ where: { id: userId } })
      .then(rows => Promise.resolve(rows === 1))
  }
}

module.exports = UserRepository

const datasource = require('./datasource')
const Sequelize = require('sequelize')

const User = datasource.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: { msg: 'Not a valid email' }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isString: function (value) {
        if (!(typeof value === 'string' || value instanceof String)) {
          throw new Error('Password must be a string')
        }
      }
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
})

module.exports = User

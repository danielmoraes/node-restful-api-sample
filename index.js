const bodyParser = require('body-parser')
const serverConfig = require('./config/server')
const datasource = require('./models/sequelize/datasource')
const errorHandlers = require('./lib/error-handlers')
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(morgan(serverConfig.isProd ? 'combined' : 'dev'))
app.use(bodyParser.json({ type: 'application/json' }))

// Routers
app.use('/users', routes.users)
app.all('*', (req, res) => res.status(404).send({ message: 'Invalid Request' }))

// Error-handling
app.use(errorHandlers.sequelizeValidationErrorHandler)
app.use(errorHandlers.headerValidationErrorHandler)
app.use(errorHandlers.uncaughtErrorHandler)

datasource
  .sync({ force: true })
  .then(() => app.listen(serverConfig.port, () =>
    console.log(`listening on port ${serverConfig.port}`)))
  .catch((err) => console.log(err))

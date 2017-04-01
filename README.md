# Sample RESTful API with NodeJS

## Prerequisites

* [PostgreSQL](http://www.postgresql.org/download/)
* [Node.js](http://nodejs.org/)

## Install

Get the code:

```
git clone https://github.com/danielmoraes/node-restful-api-sample
cd node-restful-api-sample
npm install
```

Modify the configuration options in
[`config.js`](https://github.com/danielmoraes/node-restful-api-sample/blob/master/config.js) to set
the port you want the server to listen on.

Copy
[`secret/sequelize-sample.json`](https://github.com/danielmoraes/node-restful-api-sample/blob/master/secret/sequelize-sample.json)
to `secret/sequelize.json` and set your database settings.

To start the server, run `npm start`.

## License

MIT. Copyright (c) Daniel Moraes.

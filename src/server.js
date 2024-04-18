
require('dotenv').config()

const Express = require('express');
const cors = require('cors')

function startExpressApp() {
  const app = Express();
  app.use(Express.json({ limit: '1mb' }));
  app.use(cors())

  return app
}

function runServer() {
  try {
    const app = startExpressApp()
    
    app.get('/healthcheck', function (req, res, next) {
      return res.status(200).send({status: 'ok'})
    })

    return app
  } catch (error) {
    console.log(error)
  }
}

module.exports = runServer;
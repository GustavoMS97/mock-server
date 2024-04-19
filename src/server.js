require('dotenv').config();

const Express = require('express');
const cors = require('cors');

function startExpressApp() {
  const app = Express();
  app.use(Express.json({ limit: '1mb' }));
  app.use(cors());

  return app;
}

function logRoutes(app) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map((method) => method.toUpperCase())
        .join(', ');
      routes.push(`${methods} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const methods = Object.keys(handler.route.methods)
          .map((method) => method.toUpperCase())
          .join(', ');
        routes.push(`${methods} ${handler.route.path}`);
      });
    }
  });
  console.log('\nRegistered Routes:', routes, '\n');
}

function runServer() {
  try {
    const app = startExpressApp();

    app.get('/healthcheck', function (req, res, next) {
      console.log(`I'm alive!!`);
      return res.status(200).send({ status: 'ok' });
    });

    logRoutes(app);
    return app;
  } catch (error) {
    console.log(error);
  }
}

module.exports = runServer;

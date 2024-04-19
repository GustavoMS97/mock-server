const runServer = require('./server');

async function main() {
  const app = await runServer();
  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`);
  });
}

main();

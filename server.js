const auth = require('basic-auth');
const express = require('express');
const cfenv = require('cfenv');
const app = express();
const appEnv = cfenv.getAppEnv();

app.use(function (req, res, next) {

  var credentials = auth(req);

  if (!credentials || credentials.name !== 'sidd' || credentials.pass !== 'mirji') {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    return res.end('Access denied');
  }
  next();
});

app.use(express.static(__dirname + '/wwww'));

console.log(__dirname + '/www');

app.listen(appEnv.port, function () {
  console.log('server starting on ' + appEnv.url);
});

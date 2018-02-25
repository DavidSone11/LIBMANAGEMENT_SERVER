var https = require('https');

module.exports = function (app) {

var raw_port = process.env.PORT || '4000';

var port = normalizePort(raw_port || '4000');
app.set('port', port);

var server=app.listen(port, function () {
  console.log('Server listening on url: http://localhost:'+port);
}).listen(server);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
};
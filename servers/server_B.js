
var https = require('https');
module.exports = function (app) {
var privateKey = fs.readFileSync('certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
var credentials = {

  key: privateKey,
  cert: certificate,
  host: 'http://www.local.mathologic.com',
};
var httpsServer = https.createServer(credentials, app);
var port = process.env.port || '4000';
httpsServer.listen(port, function (err) {
  if (err) throw err;
  else {
    console.log("Server is Listining on port " + port);
  }
 });
};

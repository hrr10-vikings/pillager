var express = require('express');
var bodyParser = require('body-parser').json();
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

<<<<<<< d843e946eda3237be19935e0900d274c73ed8475
app.use(bodyParser);
=======
app.use(express.static(__dirname + '/public'));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;
>>>>>>> server.js now serves static files

var apiRouter = express.Router();
app.use(express.static(__dirname + '/public'));
app.use('/api', apiRouter);

require('./apiRouter')(apiRouter);

app.listen(app.get('port'));
console.log('Pillager app now listening on port ' + app.get('port'));

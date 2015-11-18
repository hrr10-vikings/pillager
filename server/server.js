var express = require('express');
var bodyParser = require('body-parser').json();
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(bodyParser);

var apiRouter = express.Router();
app.use(express.static(__dirname + '/public'));
app.use('/api', apiRouter);

require('./apiRouter')(apiRouter);

app.listen(app.get('port'));
console.log('Pillager app now listening on port ' + app.get('port'));

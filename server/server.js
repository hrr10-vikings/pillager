var express = require('express');
var bodyParser = require('body-parser').json();
var alchemy = require('./alchemy');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.use(bodyParser);

app.use(express.static(__dirname + '/../public'));

var apiRouter = express.Router();
app.use(express.static(__dirname + '/public'));
app.use('/api', apiRouter);

require('./apiRouter')(apiRouter);

app.listen(app.get('port'));
console.log('Pillager app now listening on port ' + app.get('port'));

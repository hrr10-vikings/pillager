var express = require('express');
var bodyParser = require('body-parser').json();
var alchemy = require('./alchemy');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 8080);

//serve index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.use(bodyParser); //allows us to access the body of http requests easily

var apiRouter = express.Router();
app.use(express.static(__dirname + '/../public')); //serve static files

//for all api calls, use a dedicated router
app.use('/api', apiRouter);

require('./apiRouter')(apiRouter);

app.listen(app.get('port'));

console.log('Pillager app now listening on port ' + app.get('port'));

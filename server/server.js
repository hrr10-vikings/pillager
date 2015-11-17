var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//var server = app.listen(app.get('port'), function () {
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Pillager app listening at http://%s:%s', host, port);
//});

app.listen(app.get('port'));


console.log('Pillager app now listening on port ' + app.get('port'));
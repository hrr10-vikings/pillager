var express = require('express');
var alchemy = require('./alchemy');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pillager app listening at http://%s:%s', host, port);
});

//ALCHEMY SAMPLE USAGE:
//alchemy.getKeywords('http://www.google.com', 10, function(results) {
//    console.log(results);
//});
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('./fireBaseAPI');
var SECRET;

try {
  SECRET = process.env.JWTSecret || require('./config').JWTSecret;
} catch (e) { }

module.exports.checkAuth = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.sendStatus(403); // send forbidden if a token is not provided
  }

  try {
    req.user = jwt.decode(token, SECRET);
    next();
    } catch(error) {
      res.sendStatus(403);
    }
};

module.exports.signIn = function (req, res, next) {
    var username = req.body.username, password = req.body.password;
    db.getUser(username, function(hash) {
      bcrypt.compare(password, hash, function(err, result) {
        if (result) {
          res.json({token: jwt.encode(username, SECRET)});
          next();
        } else {
          res.sendStatus(401);
        }
      });
    }, function() {res.sendStatus(401);});
  };

module.exports.signUp = function (req, res, next) {
    var username  = req.body.username, password  = req.body.password;
    db.getUser(username, function() {next(new Error('User already exists!'));}, function() {
      bcrypt.hash(password, null, null, function(err, hash) {
        db.createUser(username, hash);
        res.json({token: jwt.encode(username, SECRET)});
        next();
      });
    });
  };
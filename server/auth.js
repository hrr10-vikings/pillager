var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('./fireBaseAPI');
var SECRET = 'secret';

module.exports.checkAuth = function(req, res, next) {
  console.log("in auth");
  console.log(req.headers);
  var token = req.headers['x-access-token'];
  console.log(token);
  if (!token) {
      return res.sendStatus(403); // send forbidden if a token is not provided
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    req.user = jwt.decode(token, SECRET);
    next();
    } catch(error) {
      return next(error);
    }
};

module.exports.signIn = function (req, res, next) {
    var username = req.body.username, password = req.body.password;
    db.getUser(username, function(hash) {
      bcrypt.compare(password, hash, function(err, res) {
        if (res) {
          res.json({token: jwt.encode(username, SECRET)});
          next();
        } else {
          res.sendStatus(401);
        }
      }, function() {res.sendStatus(401);});
    });
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
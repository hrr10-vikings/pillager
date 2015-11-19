var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('./fireBaseAPI');
var SECRET;

//load the JWT secret from either an environment variable in our production environment or a local file
try {
  SECRET = process.env.JWTSecret || require('./config').JWTSecret;
} catch (e) {
  console.log(e);
}

//checks that the user is authenticated by decoding their JWT token
module.exports.checkAuth = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.sendStatus(401); // send forbidden if a token is not provided
  }

  try {
    req.user = jwt.decode(token, SECRET);
    //if jwt.decode doesn't error, we're good to go! Send the request along.
    next();
    } catch(error) {
      res.sendStatus(401);
    }
};

//checks the database for the username and password, and responds with a token if valid
module.exports.signIn = function (req, res, next) {
  //pulls out the username and password from the request body
  var username = req.body.username, password = req.body.password;
  
  //checks the database for the user and compares passwords if the user exists
  db.getUser(username, function(hash) {
    bcrypt.compare(password, hash, function(err, result) {
      if (result) {
        //if compare returned true, send back a token
        res.json({token: jwt.encode(username, SECRET)});
        next();
      } else {
        res.sendStatus(401);
      }
    });
  }, function() {res.sendStatus(401);}); //if the user doesn't exist, return an error code
};

//checks the database for the username and password, and responds with a token if valid
module.exports.signUp = function (req, res, next) {
  var username  = req.body.username, password  = req.body.password;
    
  //if the user exists, send 409. if not, create the user and give them a token
  db.getUser(username, function() {res.sendStatus(409)}, function() {
    bcrypt.hash(password, null, null, function(err, hash) {
      db.createUser(username, hash);
      res.json({token: jwt.encode(username, SECRET)});
      next();
    });
  });
};

var jwt  = require('jwt-simple');

module.exports.checkAuth = function(req, res, next) {
  console.log("in auth");
  console.log(req.headers);
  var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch(error) {
      return next(error);
    }
  next();
}
var controllers = require('./apiControllers');
var auth = require('./auth.js');

module.exports = function(app) {

  app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
  });
  app.all("/*", function(req, res, next) {
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
  });
  app.use('/urls', auth.checkAuth);
  app.route('/urls').get(controllers.getUrls)
  .post(controllers.parseUrl);
  app.post('/users/signin', controllers.signIn);
  app.post('/users/signup', controllers.signUp);
}

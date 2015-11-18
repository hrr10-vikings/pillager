var controllers = require('./apiControllers');
var auth = require('./auth.js');

module.exports = function(app) {
  //app.use('/urls', auth.checkAuth);
  app.route('/urls').get(controllers.getUrls)
  .post(controllers.parseUrl);
  app.post('/users/signin', controllers.signIn);
  app.post('/users/signup', controllers.signUp);
}
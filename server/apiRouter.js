var controllers = require('./apiControllers');

module.exports = function(app) {
  app.route('/urls').get(controllers.getUrls)
  .post(controllers.parseUrl);
  app.post('/users/signin', controllers.signIn);
  app.post('/users/signup', controllers.signUp);
}
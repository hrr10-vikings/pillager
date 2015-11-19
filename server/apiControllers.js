var alchemy = require('./alchemy');
var db = require('./fireBaseAPI');
var auth = require('./auth');
var NUM_KEYWORDS = 4; //how many automatic keywords should be associated with each bookmark

module.exports.parseUrl = function(req, res) {
  alchemy.getKeywords(req.body.newUrl, NUM_KEYWORDS, function(results) {
    if (req.body.tags && req.body.tags.length > 0) {
      Array.prototype.push.apply(results, req.body.tags);
    }
    db.addBookmark(req.user, req.body.newUrl, results);
    res.end(JSON.stringify(results));
  });
};

module.exports.getUrls = function(req, res) {
  db.getAllBookmarks('ben', function (sites) { //req.user
    res.end(JSON.stringify(sites));
  });
};

module.exports.signIn = function(req, res, next) {
    auth.signIn(req, res, next);
};

module.exports.signUp = function(req, res, next) {
  auth.signUp(req, res, next);
};

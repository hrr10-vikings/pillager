var alchemy = require('./alchemy');
var db = require('./fireBaseAPI');
var NUM_KEYWORDS = 10;

module.exports.parseUrl = function(req, res) {
  alchemy.getKeywords(req.body.newUrl, NUM_KEYWORDS, function(results) {
    db.addBookmark("ben", req.body.newUrl, results);

    db.getAllBookmarks("ben", function (sites) {
      console.log(sites);
    });
    res.end(JSON.stringify(results));
  });
}

module.exports.getUrls = function(req, res) {
  console.log(req.body);
  var dummyUrls = {'amazon': ['keyword', 'keyword2'], 'google': ['keyword3', 'keyword4']};
  res.json(dummyUrls);
}

module.exports.signIn = function(req, res) {
  console.log('sign in');
  res.end('please go away');
}

module.exports.signUp = function(req, res) {
  console.log('sign up');
  res.end('no signing up allowed');
}
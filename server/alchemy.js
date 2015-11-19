var _ = require('underscore');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

//queries the Alchemy API for the top num keywords at url, and passes an array of keyword strings to the provided cb.
//xpath can optionally be used to adjust what portions of the document are parsed.
module.exports.getKeywords = function(url, num, cb, xpath) {
  var options = {'maxRetrieve': num, 'keywordExtractMode': 'strict'};
  if (xpath) {
    options.sourceText = 'xpath';
    options.xpath = xpath;
  }
  alchemyapi.keywords('url', url, options, function(res) {
    cb(_.pluck(res.keywords, 'text'));
  })
};
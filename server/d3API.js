/**
 * Created by paulbhorjee on 11/18/15.
 */

var firebase = require('./fireBaseAPI');
var _ = require('underscore');

module.exports.getData = function (userName) {
  firebase.getAllBookmarks(userName, massageData)
};

var massageData = function (bookmarks) {

  var allUniqueTags = _.chain(bookmarks).pluck('tags').flatten().uniq().value();

  var arrRoot = [];

  for (var i = 0; i < allUniqueTags.length; i++) {
    var siteArr = [];
    var tagname = allUniqueTags[i];


    for (var j = 0; j < bookmarks.length; j++) {
      if (bookmarks[j].tags.indexOf(tagname) > -1) {
        siteArr.push(bookmarks[j].site);
      }
    }

    var tagObj = {};
    tagObj[tagname] = siteArr;

    arrRoot.push(tagObj);
  }

  console.log(arrRoot);
};

module.exports.getData("ben");
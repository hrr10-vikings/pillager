/**
 * Created by paulbhorjee on 11/16/15.
 */


var Firebase = require("firebase");

var fbUrl = '';

try {
if (!process.env.FIREBASE_URL) {
  var configFile = require("./config.js");
  fbUrl = configFile.firebaseUrl;
} else {
  fbUrl = process.env.FIREBASE_URL
}
} catch (e) {
  console.log(e);
}

module.exports.createUser = function (userName, passwordCrypted) {
  var usersRef = new Firebase( fbUrl + "/users");

  var userObj = {};
  userObj[userName] = { 'password': passwordCrypted };

  usersRef.update(userObj);
};

module.exports.getUser = function (userName, trueCallback, falseCallback) {
  var usersRef = new Firebase( fbUrl + "/users/" + userName);

  usersRef.once('value', function (snapshot) {
    if (snapshot.val() !== null) {
      trueCallback(snapshot.val().password);
    } else {
      falseCallback();
    }
  });
};

module.exports.addBookmark = function (userName, url, tags) {
  if (!userName || !url) {
    return null;
  }

  var bookMarkObj = {};
  bookMarkObj['site'] = url;
  bookMarkObj['tags'] = tags;

  var ref = new Firebase( fbUrl + "/users/" + userName);
  var bookMarksRef = ref.child("bookmarks");

  bookMarksRef.push(bookMarkObj);
};

module.exports.getAllBookmarks = function (userName, callback) {
  if (!userName || !callback) {
    return null;
  }

  var ref = new Firebase( fbUrl + "/users/" + userName + "/bookmarks");
  var bookmarks = [];

  ref.on("value", function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      bookmarks.push(childSnapshot.val());
    });

    callback(bookmarks);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};


module.exports.getAllBookmarksByTag = function (userName, tag, callback) {
  if (!userName || !tag || !callback) {
    return null;
  }

  var ref = new Firebase(fbUrl + "/users/" + userName + "/bookmarks");
  var filteredBookmarks = [];

  ref.once("value", function (snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var bookmark = childSnapshot.val();

      if (bookmark.tags && Array.isArray(bookmark.tags) && bookmark.tags.indexOf(tag) > -1) {
        filteredBookmarks.push(bookmark);
      }
    });

    callback(filteredBookmarks);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};


//getUser("pbhorje",
//  function (pass) { console.log(pass) },
//  function (pass) { console.log("nope") }
//);

//createUser("pbhorje", "adgsdtgw45");

// module.exports.addBookmark("pbhorje", "www.gogetem.com?q=candy", ['gum', 'candy']);
//
//getAllBookmarks("ben", function (sites) {
//  console.log(sites);
//});
//
//getAllBookmarksByTag("pbhorje", "candy", function (sites) {
//  console.log(sites);
//});
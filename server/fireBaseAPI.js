/**
 * Created by paulbhorjee on 11/16/15.
 */
var Firebase = require("firebase");

var ref = new Firebase("https://sweltering-torch-27.firebaseio.com/");

var usersRef = ref.child("users");

//usersRef.set({
//  alanisawesome: {
//    date_of_birth: "June 23, 1912",
//    full_name: "Alan Turing",
//    sites: []
//  },
//  gracehop: {
//    date_of_birth: "December 9, 1906",
//    full_name: "Grace Hopper",
//    sites: []
//  }
//});

var userName = "gracehop";

//var userBookmarks = "users/" + userName + "/bookmarks/"
//var userBookmarksRef = ref.child(userBookmarks);
//
//var newSiteRef = userBookmarksRef.push();
//
//newSiteRef.set({
//  site: "www.google.com",
//  tags: ['search', 'maps', 'calendar']
//});


var getAllBookmarksWithTags = function (username, callback) {
  if (!username || !callback) {
    return null;
  }

  var ref = new Firebase("https://sweltering-torch-27.firebaseio.com/users/" + userName + "/bookmarks");

  ref.on("value", function (snapshot) {
    callback(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

var getAllBookmarksByTag = function (username, tag, callback) {
  if (!username || !tag || !callback) {
    return null;
  }

  var ref = new Firebase("https://sweltering-torch-27.firebaseio.com/users/" + userName + "/bookmarks");
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




//getAllBookmarksWithTags("gracehop", function (sites) {
//  console.log(sites);
//});

getAllBookmarksByTag("gracehop", "calendar", function (sites) {
  console.log(sites);
});
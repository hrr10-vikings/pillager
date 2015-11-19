angular.module('pillager.services', [])

.factory('Authenticate', function ($http, $location, $window) {
	//handles sending user data to server on sign up, in response the server will send back a token
	var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

	//handles sending user data to server on sign in, in respsonse the server will send back a token
	var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuthed = function () {
    //checks to see if token is stored on the browser and returns a boolean
    if($window.localStorage.getItem('jwt')){
      return true;
    } else {
      return false;
    }
  };

  return {
    signin: signin,
    signup: signup,
    isAuthed: isAuthed
  };
})

.factory('Data', function ($http, $rootScope) {
  //handles get user bookmark data from server
  //example usage from controller:   Data.fn(userName, myCallbackToUseData);
  //not tested yet with multiple views calling data thus reusing the $rootscope

  return {
    fn: getBookmarks = function (callback) {
      if (!$rootScope.data) {
        return $http({
          method: 'GET',
          url: '/api/urls'
        })
          .then(function (resp) {
            $rootScope.data = resp.data;
            callback($rootScope.data);
          });
      } else {
        callback($rootScope.data)

      }
    }
  };

  return {
    getBookmarks: getBookmarks
  };
});

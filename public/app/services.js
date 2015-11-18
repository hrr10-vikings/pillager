angular.module('pillager.services', [])

.factory('Authorize', function ($http) {
	//handles sending user data to server on sign up
	var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      console.log(resp);
    });
  };

	//handles sending user data to server on sign in
	var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      console.log(resp);
    });
  };

  return {
    signin: signin,
    signup: signup
  };
});
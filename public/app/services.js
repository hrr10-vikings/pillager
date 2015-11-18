angular.module('pillager.services', [])

.factory('Authenticate', function ($http) {
	//handles sending user data to server on sign up
	var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      console.log(resp.data.token);
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
      console.log(resp.data.token);
    });
  };

  return {
    signin: signin,
    signup: signup
  };
});
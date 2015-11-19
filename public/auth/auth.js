//angular module that will take care of authentication on the frontend
angular.module('pillager.auth', [])

.controller('AuthController', function ($scope, $window, $location, Authenticate) {
  $scope.user = {};

  $scope.signin = function () {
    Authenticate.signin($scope.user)
    .then(function (token) {
    	//stores the token in the browser's local storage
    	$window.localStorage.setItem('jwt', token);
    	//once signed in redirect to main.html
    	$location.path('/main');
    })
  }

  $scope.signup = function () {
  	Authenticate.signup($scope.user)
  	.then(function (token) {
  		//stores the token in the browser's local storage
    	$window.localStorage.setItem('jwt', token);
    	//once signed in redirect to main.html
    	$location.path('/main');
  	})
  }

  $scope.signout = function () {
    //delete the token from browser storage and redirect to sign in page
  	$window.localStorage.removeItem('jwt');
  	$location.path('/signin');
  }

  $scope.isAuthed = function () {
    if($window.localStorage.getItem('jwt')){
      return true;
    } else {
      return false;
    }
  }
});
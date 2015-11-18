//angular module that will take care of authentication on the frontend
angular.module('pillager.auth', [])

.controller('AuthController', function ($scope, Authenticate) {
  $scope.user = {};

  $scope.signin = function () {
    Authenticate.signin($scope.user);
  }

  $scope.signup = function () {
  	Authenticate.signup($scope.user);
  }
})
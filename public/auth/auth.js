//angular module that will take care of authentication on the frontend
angular.module('pillager.auth', [])

.controller('AuthController', function ($scope, Authorize) {
  $scope.user = {};

  $scope.signin = function () {
    Authorize.signin($scope.user);
  }

  $scope.signup = function () {
  	Authorize.signup($scope.user);
  }
})
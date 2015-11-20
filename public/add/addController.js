angular.module('pillager.add', [])

.controller('AddController', function ($scope, $window, $location, $http) {
  $scope.url = '';
  $scope.tags = '';
  
  $scope.add = function () {
    var toSend = {newUrl: $scope.url, tags: _.map($scope.tags.split(','), function(str) {return str.trim();})}
    $scope.url = '';
    $scope.tags = '';
    console.log(toSend);
    $http({
      method: 'POST',
      url: '/api/urls',
      data: toSend,
    }).then(function(res) {


      console.log(res);
    })
  };
});
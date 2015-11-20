angular.module('pillager.add', [])

.controller('AddController', function ($scope, $window, $location, $http) {
  $scope.url = '';
  $scope.tags = '';
  
  $scope.add = function () {
    var url = $scope.url;
    var toSend = {newUrl: $scope.url, tags: _.map($scope.tags.split(','), function(str) {return str.trim();})}
    $scope.url = '';
    $scope.tags = '';
    //console.log(toSend);
    $http({
      method: 'POST',
      url: '/api/urls',
      data: toSend
    }).then(function(res) {
      $("#added").hide();
      $("#url-added").html("<b>Site Bookmarked!</b>  " + url);

      var newTags = '<b>Tags:</b><br>';
      for (var i = 0; i < res.data.length; i++) {
        newTags += res.data[i] + '<br>';
      }
      $("#tags-added").html(newTags);

      $("#added").show("fast");
      console.log(res);
    })
  };
});
angular.module('pillager.graph', [])

  .controller('GraphController', function ($scope, $window, $location, Data, Authenticate) {
    $scope.data = {};

    (function init() {
      // load data, init scope, etc.
      //Data.getBookmarks(Authorize.user);

      Data.fn(massageDataForD3Graph);

    })();

    $scope.signout = function () {
    //delete the token from browser storage and redirect to sign in page
      $window.localStorage.removeItem('jwt');
      $location.path('/signin');
    }

});
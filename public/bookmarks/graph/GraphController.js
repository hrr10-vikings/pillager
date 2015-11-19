angular.module('pillager.graph', [])

  .controller('GraphController', function ($scope, Data, Authenticate) {
    $scope.data = {};

    (function init() {
      // load data, init scope, etc.
      //Data.getBookmarks(Authorize.user);

      Data.fn(massageDataForD3Graph);

    })();

  });
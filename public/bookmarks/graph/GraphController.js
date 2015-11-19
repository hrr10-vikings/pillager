angular.module('pillager.graph', [])

  .controller('GraphController', function ($scope, Data, Authorize) {
    $scope.data = {};

    (function init() {
      // load data, init scope, etc.
      //Data.getBookmarks(Authorize.user);

      Data.fn('ben', massageDataForD3Graph);

    })();

  });
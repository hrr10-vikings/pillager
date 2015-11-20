angular.module('pillager.tree', [])

.controller('TreeController', function ($scope, Data, $window, $location) {

  Data.fn(function(results) {
    var jsonData = [];

    for(var i = 0; i < results.length; i++){
        jsonData.push({
            id: i,
            text: results[i].site,
            state: {
                selected: false
            },
            children: results[i].tags
        })
    }

    $('#jstree').on('changed.jstree', function (e, data) {
    var objNode = data.instance.get_node(data.selected);
    $('#jstree-result').html('Selected: <br/><strong>' + objNode.id+'-'+objNode.text+'</strong>');})
      .jstree({
         core: {
           data: jsonData
           }
        });
    });

    $scope.signout = function () {
    //delete the token from browser storage and redirect to sign in page
      $window.localStorage.removeItem('jwt');
      $location.path('/signin');
    }
})

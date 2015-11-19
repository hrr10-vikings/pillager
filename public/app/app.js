var app = angular.module('pillager', [
    'pillager.services', 
    'pillager.auth',
    'pillager.graph',
    'ngRoute'
])

//frontend routing and redirects using ngRoute
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
    	templateUrl: 'auth/signin.html',
    	controller: 'AuthController',
      requiresLogin: false
    })
    .when('/signup', {
    	templateUrl: 'auth/signup.html',
    	controller: 'AuthController',
      requiresLogin: false
    })
    .when('/main', {
      templateUrl: 'main/main.html', //this will need to be changed later
      requiresLogin: true
    })
    .when('/graph', {
      templateUrl: 'bookmarks/graph/graph.html',
      controller: 'GraphController',
      requiresLogin: true
    })
    .otherwise({
    	redirectTo: '/signin'
    });

    $httpProvider.interceptors.push('AuthInterceptor');
})
.factory('AuthInterceptor', function ($window) {
  return {
    request: function (object) {
      var token = $window.localStorage.getItem('jwt');
      if (token) {
        object.headers['x-access-token'] = token;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
})
.run(function ($rootScope, $location, Authenticate, $window) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    console.log("ROUTE: ", next.$$route, $window.localStorage);
    if(next.$$route && next.$$route.requiresLogin && !Authenticate.isAuthed()) {
      $location.path('/signin');
    }
  });
});
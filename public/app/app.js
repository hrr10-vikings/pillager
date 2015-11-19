var app = angular.module('pillager', [
    'pillager.services', 
    'pillager.auth',
    'ngRoute'
]);

//frontend routing and redirects using ngRoute
app.config(function ($routeProvider) {
  $routeProvider
    .when('/signin', {
    	templateUrl: 'auth/signin.html',
    	controller: 'AuthController'
    })
    .when('/signup', {
    	templateUrl: 'auth/signup.html',
    	controller: 'AuthController'
    })
    .otherwise({
    	redirectTo: '/signin'
    })
})
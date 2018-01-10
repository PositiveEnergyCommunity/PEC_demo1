var app = angular.module("pecDemo", ['ngRoute']);

app.run(function($rootScope) {
    $rootScope.serverBaseUrl = 'http://13.250.74.140:3000';
});

app.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.
            
   when('/login', {
      templateUrl: 'partials/loginform.html',
      controller: 'loginCtrl'
   }).
	
	when('/register', {
      templateUrl: 'partials/profile_new.html',
      controller: 'loginCtrl'
   }).
	
   otherwise({
      redirectTo: '/login'
   });
	
}]);

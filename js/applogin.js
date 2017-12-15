var app = angular.module("pecDemo", ['ngRoute']);

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
			
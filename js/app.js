var app = angular.module("pecDemo", ['ngStorage','ngRoute','AxelSoft']);

app.run(function($rootScope) {
    $rootScope.serverBaseUrl = 'http://localhost:3000';
});

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	
	$routeProvider.
            
   when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl'
   }).
	
	when('/profilestart', {
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl'
   }).
	
	when('/editprofile', {
      templateUrl: 'partials/profile_new.html',
      controller: 'profileCtrl'
   }).
            
   when('/asset', {
      templateUrl: 'partials/asset.html',
      controller: 'assetCtrl'
   }).
	
	when('/newasset', {
      templateUrl: 'partials/asset_new.html',
      controller: 'assetCtrl'
   }).
	
	when('/editasset', {
      templateUrl: 'partials/asset_new.html',
      controller: 'assetCtrl'
   }).
	
	when('/pool', {
      templateUrl: 'partials/pool.html',
      controller: 'poolCtrl'
   }).
   
	when('/newpool', {
      templateUrl: 'partials/pool_new.html',
      controller: 'poolCtrl'
   }).
	
	when('/editpool', {
      templateUrl: 'partials/pool_new.html',
      controller: 'poolCtrl'
   }).
	
	when('/portfolio', {
      templateUrl: 'partials/portfolio.html',
      controller: 'portfolioCtrl'
   }).
	
	when('/logout', {
      templateUrl: 'login.html',
      controller: 'loginCtrl'
   }).
	
   otherwise({
      redirectTo: '/profile'
   });
	
	
	$httpProvider.interceptors.push(['$localStorage', function($localStorage) {

      return {
         'request': function (config) {
            config.headers = config.headers || {};
				console.log("[interceptor] - add token = "+$localStorage.token);
            if ($localStorage.token) {
               config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
         },
         'responseError': function(response) {
				console.log("[interceptor] - responseError = ");
            return;
         }
      };																																									
   }]);	
	
}]);
		
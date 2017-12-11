//-----------------------------------------------------------------------------
//	 PEC DEMO - login Controller
//  Dan DUONG - 24/11/2017
//
//-----------------------------------------------------------------------------

angular.module('pecDemo', ['ngStorage'])

.controller('loginCtrl', function($scope, $http, $window, loginService ) {
	$scope.email = 'john@email.com';
	$scope.password = 'qwerty';
	$scope.passwordConf = 'qwerty';
	$scope.firstname = 'John';
	$scope.lastname = 'Steed';
	$scope.title = 'Sir';
	$scope.phone = '12345678';
	
	$scope.logEmail = 'Enter your email address'
	$scope.logPassword = 'Enter your password'
	$scope.userData;
	
	$scope.errormessage;
	$scope.errorstatus;

	//-----------------------------------------------------------------------------
	// Function login()
	// Role : Log in a user
	//-----------------------------------------------------------------------------
   $scope.logout = function() {
      loginService.logout(function() {
         window.location = "/"
      }, function() {
         alert("Failed to logout!");
      });
   };


	//-----------------------------------------------------------------------------
	// Function login()
	// Role : Log in a user
	//-----------------------------------------------------------------------------
	$scope.login = function() {
		console.log("[login]- begin");
		console.log("[login]- email = " + $scope.logEmail);
		console.log("[login]- password = " + $scope.logPassword);
		
		$http.get("http://localhost:3000/user/login?logemail=" + $scope.logEmail + "&logpassword="+ $scope.logPassword)
		.then(function success(response){
			console.log("[login]- success response = " + response);
			console.log("[login]- success type = " + response.type);
					
			var url =  './home.html#/profile?data='+response.data.token;
			$window.location.href = url;
			
			}, 
			function error(response) {
         // Handle error here
			//console.log("[login]- err " + response.status);
			//console.log("[login]- err " + response.data.error);
			$scope.errormessage = response.data.error;
			$scope.errorstatus = response.status;
			//alert("Error: "+ response.status + " - "+ response.data.error); 
			})
	}
	
	//-----------------------------------------------------------------------------
	// Function register()
	// Role : Create a new user
	//-----------------------------------------------------------------------------
	$scope.register = function() {
		console.log("[register]- begin");
		console.log("[register]- email = " + $scope.email);
		console.log("[register]- password = " + $scope.password);
		
		var inData = {
			'id': null,
			'title': $scope.title,
			'firstname': $scope.firstname,
			'lastname': $scope.lastname,
			'email': $scope.email, 
			'password': $scope.password,
			'passwordConf': $scope.passwordConf,
			'phone': $scope.phone,
			'userStatus': $scope.userStatus};
		
		$http.post("http://localhost:3000/user/", inData).
		then(function success(response) { 
			console.log("[register]- success");
			//console.log("[register]- success data = " + response.data.user.firstname);
			//console.log("[register]- success token = " + response.data.token);
			
			var url =  './home.html#/profile?data='+response.data.token;
			$window.location.href = url;
		},
		function error(err) {
			console.log("[register]- err = " + err);
			alert("error"); 
		});
	}

});
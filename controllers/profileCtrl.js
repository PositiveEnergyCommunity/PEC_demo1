angular.module("pecDemo")

.controller('profileCtrl', function($scope, $http, $routeParams, $localStorage) {
   $scope.message = "This page will be used to display login or register form";
	$scope.email;
	$scope.firstname;
	$scope.lastname;
	$scope.title;
	$scope.phone;
	$scope.password;;
	$scope.passwordConf;
	
	//-----------------------------------------------------------------------------
	// Function init()
	// 	Internal function to init the profile form
	//
	init = function () {

		console.log("[profileCtrl init]- begin");
		
		$localStorage.token = $routeParams.data;;
		console.log("[profileCtrl init]- token = " +$localStorage.token);
		
		
		$http.get("http://localhost:3000/user").
		then(function success(response){
			console.log("[init]- status = " + response.status);
			console.log("[init]- email = " + response.data.user.email);
			$scope.email = response.data.user.email;
			$scope.firstname = response.data.user.firstname;
			$scope.lastname = response.data.user.lastname;
			$scope.title = response.data.user.title;
			$scope.phone = response.data.user.phone;
			},
			function error(err) {
			console.log("[init]- err = " + err);
			alert("error"); 
		});
	};
	
	init();
	
	
	//-----------------------------------------------------------------------------
	// Function update()
	// Role : Create a new user
	//-----------------------------------------------------------------------------
	$scope.update = function() {
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
		
		$http.post("http://localhost:3000/user/", inData).then(function (data, status, headers, config) { 
			console.log("[register]- data = " + data);
			console.log("[register]- status = " + status);
			console.log("[register]- headers = " + headers);
			console.log("[register]- config = " + config);
			alert("success"); 
		},function (data, status, headers, config) { 
			console.log("[register]- data = " + data);
			console.log("[register]- status = " + status);
			console.log("[register]- headers = " + headers);
			console.log("[register]- config = " + config);
			alert("error"); 
		});
	}
	

	
});

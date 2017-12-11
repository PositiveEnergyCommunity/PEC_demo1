angular.module("pecDemo")

.controller('profileCtrl', function($scope, $http, $routeParams, $localStorage, $interval) {
   $scope.message = "This page will be used to display login or register form";
	
	$scope.user = {
		email: 'warren@gold.com',
		firstname: 'Warren',
		lastname: 'Buffet',
		title: 'Gourou',
		phone: '8888 8888',
		password: 'warren',
		profile: 'Investor',
	}
	
	$scope.passwordConf = 'warren';
		
	$scope.company = {
		identity: {
			legalName: 'J Safra Sarasin Ltd',
			legalForm: 'Ltd.',
			registrationNb: '1234567890',
			dateOfCreation: '01/01/1841',
			domiciliation: {
				street: '8 Marina View #25-01 Asia Square Tower 1',
				zipcode: '018960',
				city: 'Singapore',
				province: '',
				country: 'Singapore'
			}
		},
		name: 'J Safra Sarasin',
		description: 'Private Banking',
		poolManager: 'Jack Daniels',
		currency: 'USD'
	};
	
	
	var tick = function() {
		$scope.date = Date.now();
	}
	tick();
	$interval(tick, 1000);
	
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
			'title': $scope.user.title,
			'firstname': $scope.user.firstname,
			'lastname': $scope.user.lastname,
			'email': $scope.user.email, 
			'password': $scope.user.password,
			'passwordConf': $scope.passwordConf,
			'phone': $scope.user.phone,
			'userStatus': $scope.user.profile};
		
		$http.put("http://localhost:3000/user/", inData).then(function (data, status, headers, config) { 
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

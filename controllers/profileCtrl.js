//-----------------------------------------------------------------------------
//	 PEC DEMO - login Controller
//  Dan DUONG - 24/11/2017
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('profileCtrl', function($rootScope, $scope, $window, $location, $http, $routeParams, $localStorage, $interval) {
	$scope.pagename = 'Profile Update';
	$scope.button = 'UPDATE';
	
	$scope.user = {
		email: 'warren@gold.com',
		firstname: 'Warren',
		lastname: 'Buffet',
		title: 'Gourou',
		phone: '8888 8888',
		password: 'warren',
		profile: 'Investor',
		userStatus: 'active'
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
		representative: 'Jack Daniels',
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
		if ($location.path() === "/profilestart") {
			console.log("[profileCtrl init]- profilestart");
			$localStorage.token = $routeParams.data;
		};
			
		console.log("[profileCtrl init]- token = " +$localStorage.token);
		console.log("[login]- server url = " + $rootScope.serverBaseUrl );
		
		if ($localStorage.token != null) {
			$http.get( $rootScope.serverBaseUrl + "/user").
			then(function success(response){
				console.log("[init]- status = " + response.status);
				console.log("[init]- email = " + response.data.user.email);
				$scope.user.email = response.data.user.email;
				$scope.user.firstname = response.data.user.firstname;
				$scope.user.lastname = response.data.user.lastname;
				$scope.user.title = response.data.user.title;
				$scope.user.phone = response.data.user.phone;
				$scope.company = response.data.company;
				console.log("[profileCtrl init]- token = " +$localStorage.token);
				},
				function error(err) {
				console.log("[init]- err = " + err);
				alert("error"); 
			});
		} else {
			alert("Access denied");
			var url =  './login.html';
			$window.location.href = url;
		};
	};
	
	init();
	
	
	//-----------------------------------------------------------------------------
	// Function update()
	// Role : Update user's information
	//-----------------------------------------------------------------------------
	$scope.newFormButtonAction = function() {
		update();
	}
	
	update = function() {
		console.log("[update]- begin");
		
		var inData = {
			'id': null,
			'title': $scope.user.title,
			'firstname': $scope.user.firstname,
			'lastname': $scope.user.lastname,
			'email': $scope.user.email, 
			'password': $scope.user.password,
			'passwordConf': $scope.passwordConf,
			'phone': $scope.user.phone,
			'profile': $scope.user.profile,
			'userStatus': $scope.user.userStatus,
			'company': $scope.company};
		
		$http.put( $rootScope.serverBaseUrl + "/user/", inData).then(function (data, status, headers, config) { 
			console.log("[update]- data = " + data);
			console.log("[update]- status = " + status);
			console.log("[update]- headers = " + headers);
			console.log("[update]- config = " + config);
			//alert("success"); 
			$location.path("/profile");
			
		},function (data, status, headers, config) { 
			console.log("[update]- data = " + data);
			console.log("[update]- status = " + status);
			console.log("[update]- headers = " + headers);
			console.log("[update]- config = " + config);
			alert("error"); 
		});
	}
	
	//-----------------------------------------------------------------------------
	// Function selectTimer
	// Role : Set the selected fixed digit of the operation.
	//-----------------------------------------------------------------------------	
	$scope.selectTimer = function(duration, text) {
			
		console.log("[selectDuration]- duration = " + duration);
		$scope.testDuration = duration;
		
		console.log("[selectDuration]- text = " + text);
		$("#btnTimerSelect").html(text + '&nbsp;<span class="caret"></span>');
	}
	
});

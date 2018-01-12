//-----------------------------------------------------------------------------
//	 PEC DEMO - login Controller
//  Dan DUONG - 24/11/2017
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('profileCtrl', function($rootScope, $scope, $window, $location, $http, $routeParams, $localStorage, $interval) {
	$scope.pagename = 'Profile Update';
	$scope.button = 'UPDATE';
	
	$rootScope.user = {
		email: 'warren@gold.com',
		password: 'warren',
		firstname: 'Warren',
		lastname: 'Buffet',
		prefix: 'Gourou',
		phone: '8888 8888',
		userStatus: 'active',
		company_Id:'',
		title:'Chief Investor',
		portfolio_Id:'',
		profile: 'investor',
		description:''
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
				$rootScope.user.email = response.data.user.email;
				$rootScope.user.firstname = response.data.user.firstname;
				$rootScope.user.lastname = response.data.user.lastname;
				$rootScope.user.prefix = response.data.user.prefix;
				$rootScope.user.phone = response.data.user.phone;
				$rootScope.user.userStatus = response.data.user.userStatus;
				$scope.company = response.data.company;
				$rootScope.user.title = response.data.user.title;
				$rootScope.user.portfolio_Id = response.data.user.portfolio_Id;
				$rootScope.user.profile = response.data.user.profile;
				$rootScope.user.description = response.data.user.description;
				
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
			'title': $rootScope.user.title,
			'firstname': $rootScope.user.firstname,
			'lastname': $rootScope.user.lastname,
			'email': $rootScope.user.email, 
			'password': $rootScope.user.password,
			'passwordConf': $scope.passwordConf,
			'phone': $rootScope.user.phone,
			'userStatus': $rootScope.user.userStatus,
			'company': $scope.company,
			'title': $rootScope.user.title,
			'portfolio_Id': $rootScope.user.portfolio_Id,
			'profile': $rootScope.user.profile,
			'description': $rootScope.user.description,};
		
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

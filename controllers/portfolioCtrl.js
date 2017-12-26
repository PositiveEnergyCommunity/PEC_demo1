//-----------------------------------------------------------------------------
//	 PEC DEMO - portfolio Controller
//  Dan DUONG - 15/12/2017
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('portfolioCtrl', function($scope, $location, $http, $window, $routeParams, $localStorage, $interval) {
	$scope.pagename = 'Profile Update';
	$scope.button = 'UPDATE';
	
	$scope.portfolio = {
		currency: 'USD',
		investValuation: 285600.00,
		cashAccount: 767100.00,
		margin: 52000.00,
		tokens: [
			{name:"ER Token", supply:8567.54, value:100 },
			{name:"EP Token", supply:10000, value:8.87 },
			{name:"EC Token", supply:20000, value:100 },
			{name:"RECP Token", supply:10000, value:20.58 },
			{name:"REC Token", supply:32657, value:5.64 }
		]
	};
	
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
	
	$scope.image1 = {
			src:'pictures/pool graph1.png',
			alt:'chart'
	};
	
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
		
		$http.get("http://localhost:3000/user").
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
	};
	
	init();
	
	
	//-----------------------------------------------------------------------------
	// Function update()
	// Role : Update user's information
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
			'profile': $scope.user.profile,
			'userStatus': $scope.user.userStatus,
			'company': $scope.company};
		
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
	
	
	//-----------------------------------------------------------------------------
	// Function goToAsset()
	// Role : goToAsset View page
	//-----------------------------------------------------------------------------
	$scope.goToAsset = function() {
		console.log("[goToAsset]- begin");
		var url =  './home.html#/asset';
			$window.location.href = url;
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

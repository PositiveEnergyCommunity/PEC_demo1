//-----------------------------------------------------------------------------
//	 PEC DEMO - portfolio Controller
//  Dan DUONG - 15/12/2017
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('portfolioCtrl', function($scope, $location, $http, $routeParams, $localStorage, $interval) {
	$scope.pagename = 'Profile Update';
	$scope.button = 'UPDATE';
	
	$scope.portfolio = {
		currency: '',
		investValuation: 0,
		cashAccount: 0,
		margin: 0,
		tokens: [
			{name:"ER Token", supply:8567.54, value:100 },
			{name:"EP Token", supply:10000, value:8.87 },
			{name:"EC Token", supply:20000, value:100 },
			{name:"RECP Token", supply:10000, value:20.58 },
			{name:"REC Token", supply:32657, value:5.64 }
		]
	};
	
	$scope.user = {
		email: '',
		firstname: '',
		lastname: '',
		title: '',
		phone: ' ',
		password: '',
		profile: '',
		userStatus: ''
	}
	
	$scope.passwordConf = '';
		
	$scope.company = {
		identity: {
			legalName: 'J Safra Sarasin Ltd',
			legalForm: 'Ltd.',
			registrationNb: '1234567890',
			dateOfCreation: new Date('01/01/1841'),
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
	
	$scope.selectedOverviewView =1;
	
	$scope.breadcrums = [''];
					
	$scope.structure = { folders: [
		{ name: 'Contracts and Legal', folders: [
			{ name: 'SPV Legal Set-up', files: [{ name: 'SPV Registration.pdf' }] },
			{ name: 'Operation contracts', files: [{ name: 'Supplier.pdf' }, { name: 'Contractor.pdf' }] },
			{ name: 'PPAs', files: [{ name: 'Apple Store PPA.pdf' }, { name: 'NTU PPA.pdf' }]}
		]},
		{ name: 'Financial Information', files: [{ name: 'File 21.jpg' }, { name: 'File 22.png' }], folders: [
			{ name: 'Subfolder 21', files: [{ name: 'Subfile 221.txt' }] },
			{ name: 'Subfolder 22' },
			{ name: 'Subfolder 23' }
		]},
		{ name: 'Customers and Pipeline', files: [{ name: 'File 31.jpg' }, { name: 'File 32.png' }], folders: [
			{ name: 'Subfolder 31', files: [{ name: 'Subfile 311.txt' }] },
			{ name: 'Subfolder 32' },
			{ name: 'Subfolder 33' }
		]}
	], files: [{ name: 'File 1.gif' }, { name: 'File 2.gif' }]};
	
	$scope.options = {
		onNodeSelect: function (node, breadcrums) {
			$scope.breadcrums = breadcrums;
		}
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
		
		$http.get("http://54.254.196.108:3000/user").
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
		
		$http.put("http://54.254.196.108:3000/user/", inData).then(function (data, status, headers, config) { 
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
	// Function assetOverview()
	// Role : goToAsset View page
	//-----------------------------------------------------------------------------
	$scope.setOverview = function(view) {
		console.log("[assetOverview]- begin");
		console.log("[assetOverview]- selectedOverviewView before= " + $scope.selectedOverviewView);
		$scope.selectedOverviewView = view;
		console.log("[assetOverview]- selectedOverviewView after= " + $scope.selectedOverviewView);
	}
	
	$scope.testOverview = function(view) {
		console.log("[testOverview]- begin");
		//console.log("[testOverview]- selectedOverviewView = " + $scope.selectedOverviewView);
		if ($scope.selectedOverviewView === view) {
			//console.log("[testOverview]- true");
			return true;
		}	
		else {
			//console.log("[testOverview]- false");
			return false;
		}
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

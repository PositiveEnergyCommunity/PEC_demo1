//-----------------------------------------------------------------------------
//	 PEC DEMO - login Controller
//  Dan DUONG - 24/11/2017
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller("loginCtrl", function($rootScope, $scope, $http, $window, loginService ) {
	
	$scope.pagename = 'Register New User';
	$scope.button = 'REGISTER';
		
	$scope.user = {
		email: '',
		firstname: '',
		lastname: '',
		title: '',
		phone: '',
		password: '',
		profile: '',
		userStatus: '',
	}
	
	$scope.passwordConf = '';
	$scope.bRegister = true;

	$scope.company = {
		identity: {
			legalName: '',
			legalForm: '.',
			registrationNb: '',
			dateOfCreation: 'format: 29 Nov 2017',
			domiciliation: {
				street: '',
				zipcode: '',
				city: '',
				province: '',
				country: ''
			}
		},
		name: '',
		description: '',
		representative: 'John Doe',
		currency: ''
	};
	
	$scope.logEmail = 'Enter your email address'
	$scope.logPassword = 'Enter your password'
	$scope.userData;
	
	$scope.errormessage;
	$scope.errorstatus;

	//-----------------------------------------------------------------------------
	// Function logout()
	// Role : Log out a user
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
		console.log("[login]- server url = " + $rootScope.serverBaseUrl );
		
		$http.get( $rootScope.serverBaseUrl+ "/user/login?logemail=" + $scope.logEmail + "&logpassword="+ $scope.logPassword)
		.then(function success(response){
			console.log("[login]- success type = " + response.data.type);
					
			var url =  './home.html#/profilestart?data='+response.data.token;
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
	$scope.newFormButtonAction = function() {
		register();
	}
	
	register = function() {
		console.log("[register]- begin");
		console.log("[register]- email = " + $scope.user.email);
		console.log("[register]- password = " + $scope.user.password);
		
		$scope.company.name = $scope.company.identity.legalName;
		
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
		
		$http.post( $rootScope.serverBaseUrl + "/user/", inData).
		then(function success(response) { 
			console.log("[register]- success");
			//console.log("[register]- success data = " + response.data.user.firstname);
			//console.log("[register]- success token = " + response.data.token);
			
			var url =  './home.html#/profilestart?data='+response.data.token;
			$window.location.href = url;
		},
		function error(err) {
			console.log("[register]- err = " + err);
			alert("error"); 
		});
	}

});
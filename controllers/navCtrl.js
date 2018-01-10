//-----------------------------------------------------------------------------
//	 PEC DEMO - Nav bar Controller
//  Dan DUONG - 04/01/2018
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('navCtrl', function($rootScope, $scope, $window, $localStorage) {
	
	$rootScope.pool = {
		identity: {
			legalName: 'Solar Bonds of Malaysia',
			legalForm: 'SPV to be defined',
			registrationNb: '1234567890',
			dateOfCreation: new Date('11/30/2017'),
			domiciliation: {
				street: '1 Ayer Rajah Avenue',
				zipcode: '385350',
				city: 'Singapore',
				province: 'One North',
				country: 'Singapore'
			}
		},
		name: 'Malaysia Solar Bonds',
		description: 'This pool is a low risk bond pool on Solar pools in Malaysia',
		poolManager: 'John Doe',
		currency: 'USD',
		initialValue:2500000,
		investValuation: 3335439.48,
		cashAccount: 250000,
		managementFees: 0.02,
		oAndMFees: 0.05,
		performanceFees: 0.10,
		tokens: [
			{name:"ER Token", supply:8567.54, value:100 },
			{name:"EP Token", supply:10000, value:8.87 },
			{name:"EC Token", supply:20000, value:100 },
			{name:"RECP Token", supply:10000, value:20.58 },
			{name:"REC Token", supply:32657, value:5.64 }
		]
	};
	
	
	//-----------------------------------------------------------------------------
	// Function logout
	// Role : Log out the user. Reset the token in the localStorage
	//-----------------------------------------------------------------------------	
	$scope.logout = function () {
		console.log("[logout] - Begin");
		$localStorage.token = "";
		$window.localStorage.clear();
		console.log("[logout] - token = " + $localStorage.token);
		var url =  './login.html';
		$window.location.href = url;
	}

});

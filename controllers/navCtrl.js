//-----------------------------------------------------------------------------
//	 PEC DEMO - Nav bar Controller
//  Dan DUONG - 04/01/2018
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('navCtrl', function($rootScope, $scope, $window, $localStorage) {
	
	$rootScope.date = Date.now();
	
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
			{name:"Energy PPA Bond Token", supply:8567.54, value:100 },
			{name:"Energy PPA Equity Token", supply:10000, value:8.87 },
			{name:"Energy PPA Purchase Token", supply:20000, value:100 },
			{name:"REC Equity Token", supply:10000, value:20.58 },
			{name:"REC Token", supply:32657, value:5.64 }
		]
	};
	
	$rootScope.orderlist = {
		orders: [
			{name:"Energy PPA Bond Token", 	type:'Limit Order', buySell:'Buy',  amount:1000, price:38.50, current:39.00, stop:'' , limit:38.50 ,duration:'24h', created:($rootScope.date-60000*150)},
			{name:"Energy PPA Equity Token", type:'Limit Order', buySell:'Sell', amount: 300, price:99.80, current:96.60, stop:'' , limit:99.80 ,duration:'G.T.C.', created:($rootScope.date-60000*153)},
			{name:"REC Equity Token", 			type:'Limit Order', buySell:'Buy',  amount: 500, price: 7.20, current: 7.23, stop:'' , limit: 7.20 ,duration:'24h', created:($rootScope.date-60000*157)}
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

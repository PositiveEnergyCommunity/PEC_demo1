//-----------------------------------------------------------------------------
//	 PEC DEMO - Nav bar Controller
//  Dan DUONG - 04/01/2018
//
//-----------------------------------------------------------------------------

angular.module("pecDemo")

.controller('navCtrl', function($rootScope, $scope, $window, $localStorage) {
	
	//-----------------------------------------------------------------------------
	// Function selectTimer
	// Role : Set the selected fixed digit of the operation.
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

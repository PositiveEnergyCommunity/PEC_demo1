angular.module("pecDemo")

.controller('logoutCtrl', function($scope, $location, $http, $interval) {
	
	
	
	
	//-----------------------------------------------------------------------------
	// Function init()
	// Internal function to init the pool form
	//
	init = function () {
		console.log("[initPool]- Begin");
		
		$http.get("http://localhost:3000/pools").then(function(response){
			console.log("[init]- status = " + response.status);
			
			var length = Object.keys(response.data).length;
			//console.log("[init]- length = " + length);
			($scope.nameList).push((response.data[0]).name);
			for ( var i = 1; i<length; i++) {
				var object = response.data[i];
				($scope.nameList).push(object.name);
				console.log("[init]- name = " + object.name);
			};
		});
	}
	
	
	
	init();
	
	
	
	//-----------------------------------------------------------------------------
	// Function update()
	// Role : Update an pool
	//-----------------------------------------------------------------------------
	$scope.createOrUpdate = function() {
		if ( $scope.pagename === "New Pool" ) {
			createPool();
		}
		else if ( $scope.pagename === "Update Pool" ) {
			updatePool();
		}
	};

	
	
	updatePool = function() {
		console.log("[updatePool]- begin");
	};
	
	
	//-----------------------------------------------------------------------------
	// Function createPool()
	// Role : Create a new pool
	//-----------------------------------------------------------------------------
	createPool = function() {
		console.log("[createPool]- begin");
		
		console.log("[createPool]- name = " + $scope.pool.name);
		
		$http.post("http://localhost:3000/pool/", $scope.pool).then(function (data, status, headers, config) { 
			console.log("[createPool]- data = " + data);
			console.log("[createPool]- status = " + status);
			console.log("[createPool]- headers = " + headers);
			console.log("[createPool]- config = " + config);
			$location.path("/pool");
			//alert("success"); 
		},function (data, status, headers, config) { 
			console.log("[createPool]- data = " + data);
			console.log("[createPool]- status = " + status);
			console.log("[createPool]- headers = " + headers);
			console.log("[createPool]- config = " + config);
			alert("error"); 
		});
	};
	
	//-----------------------------------------------------------------------------
	// Function clear()
	// Role : Clear data from pool object, except poolManager field.
	//-----------------------------------------------------------------------------
	$scope.clear = function() {
		//console.log("[clear]- begin");
		$scope.pool = {
			identity: {
				legalName: '',
				legalForm: '',
				registrationNb: '',
				dateOfCreation: '',
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
			poolManager: 'John Doe',
			currency: '',
			investValuation: 0,
			cashAccount: 0,
			tokens: [],
		}
	};
});
         

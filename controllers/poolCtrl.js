angular.module("pecDemo")

.controller('poolCtrl', function($rootScope, $scope, $location, $http, $interval) {
	
	$scope.nameList=[];
	$scope.poolList=[];
	
	
	
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
	// Internal function to init the pool form
	//
	init = function () {
		console.log("[initPool]- Begin");
		
		$http.get( $rootScope.serverBaseUrl + "/pools").then(function(response){
			console.log("[init]- status = " + response.status);
			
			var length = Object.keys(response.data).length;
			
			for ( var i = 0; i<length; i++) {
				var object = response.data[i];
				($scope.nameList).push(object.name);
				$scope.poolList[object.name] = object;
				console.log("[init]- name = " + object.name);
			};
		});
	}
	
	
	//-----------------------------------------------------------------------------
	// Initialize content, depending on which page.
	//
	if ($location.path() === "/pool") {
		console.log("[poolCtrl] - Begin 1");
		$scope.pagename = "";
		$scope.buttonlabel = "";
		init();
	} 
	else if ($location.path() === "/newpool") {
		console.log("[poolCtrl] - Begin 2");
		$scope.pagename = "New Pool";
		$scope.buttonlabel = "CREATE";		
	}
	else {
		console.log("[poolCtrl] - Begin 3");
		$scope.pagename = "Update Pool";
		$scope.buttonlabel = "UPDATE";
	}
	
	angular.element(function () {
		if ($location.path() === "/newpool"){
			//console.log('page loading completed - clear');
			$scope.$apply(function() {
			$scope.clear();
			});
		};
	});	
	
	
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
		
		console.log("[createPool]- name = " + $rootScope.pool.name);
		
		$http.post( $rootScope.serverBaseUrl + "/pool/", $rootScope.pool).then(function (data, status, headers, config) { 
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
	// Function displayPool()
	// Role : display the new asset form page
	//-----------------------------------------------------------------------------
	$scope.displayPool = function(name) {
		console.log("[displayPool]- begin");
		console.log("[displayPool]- name = "+name);
		
		$rootScope.pool = ($scope.poolList)[name];
	}
	
	
	//-----------------------------------------------------------------------------
	// Function clear()
	// Role : Clear data from pool object, except poolManager field.
	//-----------------------------------------------------------------------------
	$scope.clear = function() {
		//console.log("[clear]- begin");
		$rootScope.pool = {
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
         

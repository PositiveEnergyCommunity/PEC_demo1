angular.module("pecDemo")

.controller('poolCtrl', function($scope, $location, $http, $interval) {
	
	$scope.nameList=[];
	
	$scope.pool = {
		identity: {
			legalName: 'Solar Bonds of Malaysia',
			legalForm: 'SPV to be defined',
			registrationNb: '1234567890',
			dateOfCreation: '11/30/2017',
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
		investValuation: 3335439.48,
		cashAccount: 250000,
		tokens: [
			{name:"ER Token", supply:8567.54, value:100 },
			{name:"EP Token", supply:10000, value:8.87 },
			{name:"EC Token", supply:20000, value:100 },
			{name:"RECP Token", supply:10000, value:20.58 },
			{name:"REC Token", supply:32657, value:5.64 }
		]
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
         

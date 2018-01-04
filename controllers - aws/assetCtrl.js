angular.module("pecDemo")

.controller('assetCtrl', function($scope, $location, $http, $interval) {
	
	$scope.nameList=[];
	$scope.assetList=[];
	$scope.images = {
		image1: {
			src:'pictures/financial_projections.png',
			alt:'financials'
			},
		image2: {
			src:'pictures/revenue_breakdown.png',
			alt:'breakdown'
			},
		image3: {
			src:'pictures/energy_produced.png',
			alt:'production'
			},
		image4: {
			src:'pictures/cumulated_cashflow.png',
			alt:'cashflows'
			},
	};
	                      
	$scope.name = 'Gujarat Solar Park';
	$scope.developer = 'Moser Baer';
	
	$scope.address = {
		street: 'Santanpur',
		zipcode: '385350',
		city: 'Charanka',
		province: 'Gujarat',
		country: 'India'
	};
	
	$scope.currency = 'USD';
	$scope.dateOfCreation = new Date('12/24/2010');
	$scope.dateOfCommission = new Date('10/12/2011');
	
	$scope.lifeDuration = '30';
	$scope.energyType = 'Solar';
	$scope.installedCapacity = '20000';
	
	$scope.projectCosts = { 
		investmentCost: '12000000',
		setupCost: '400000',
		consultingCost: '600000'
		};
	$scope.totalCosts = '13000000';

	$scope.specificYield = '1350';
	$scope.degression = '0.50';
	
	$scope.variableCosts = {
		insurance: '8000',
		security: '2000',
		technicalOps: '5000',
		salesOps: '5000',
		maintenance: '10000',
		lease: '40000'
	};
	
	$scope.fixedCosts = {
		generalAndAdmin: '300000',
		otherFixedCosts: '100000'
	};
	
	$scope.projectFinancing = {
		equity: '20',
		seniorLoan: '50',
		juniorLoan: '30'
	};
	
	$scope.seniorLoan = {
		amount: '6500000 ',
		duration: '240',
		interestRate: '4'
	};
	
	$scope.juniorLoan = {
		amount: '3900000',
		duration: '180',
		interestRate: '8'
	};
	
	$scope.financing = {
		total: '13000000',
		equityAmount: '2600000',
		totalPerCent: '100'
	};
	
	var tick = function() {
		$scope.date = Date.now();
	}
	tick();
	$interval(tick, 1000);
	
	//-----------------------------------------------------------------------------
	// Function init()
	// Internal function to init the asset form
	//
	init = function () {
		console.log("[initAsset]- Begin");
		
		$http.get("http://54.254.196.108:3000/assets").then(function(response){
			console.log("[initAsset]- status = " + response.status);
			
			var length = Object.keys(response.data).length;

			for ( var i = 0; i<length; i++) {
				var object = response.data[i];
				($scope.nameList).push(object.name);
				$scope.assetList[object.name] = object;
				console.log("[initAsset]- developer = " + ($scope.assetList)[object.name].developer);
			};

		});
	}
	
	//-----------------------------------------------------------------------------
	// Initialize content, depending on which page.
	//
	if ($location.path() === "/asset") {
		console.log("[assetCtrl] - Begin 1");
		$scope.pagename = "";
		$scope.buttonlabel = "";
		init();
	} 
	else if ($location.path() === "/newasset") {
		console.log("[assetCtrl] - Begin 2");
		$scope.pagename = "New Asset";
		$scope.buttonlabel = "CREATE";		
	}
	else {
		console.log("[assetCtrl] - Begin 3");
		$scope.pagename = "Update Asset";
		$scope.buttonlabel = "UPDATE";
	}
	
	angular.element(function () {
		if ($location.path() === "/newasset"){
			//console.log('page loading completed - clear');
			$scope.$apply(function() {
			$scope.clear();
			});
		};
	});	
	
	
	//-----------------------------------------------------------------------------
	// Function update()
	// Role : Update an asset
	//-----------------------------------------------------------------------------
	$scope.createOrUpdate = function() {
		if ( $scope.pagename === "New Asset" ) {
			createAsset();
		}
		else if ( $scope.pagename === "Update Asset" ) {
			updateAsset();
		}
	};

	
	
	updateAsset = function() {
		console.log("[updateAsset]- begin");
	};
	
	
	
	//-----------------------------------------------------------------------------
	// Function createAsset()
	// Role : Create a new asset
	//-----------------------------------------------------------------------------
	createAsset = function() {
		console.log("[createAsset]- begin");
		
		var inData = {   
			'id': null,
	      'name': $scope.name,
			'developer' : $scope.developer,
			'address' : $scope.address,
			'currency' : $scope.currency,
			'dateOfCreation' : $scope.dateOfCreation,
			'dateOfCommission' : $scope.dateOfCommission,
			'lifeDuration' : $scope.lifeDuration,
			'energyType' : $scope.energyType,
			'installedCapacity' : $scope.installedCapacity,	
			'projectCosts' : $scope.projectCosts, 
			'totalCosts' : $scope.totalCosts,
			'specificYield' : $scope.specificYield,
			'degression' : $scope.degression,	
			'variableCosts' : $scope.variableCosts,
			'fixedCosts' : $scope.fixedCosts,
			'projectFinancing' : $scope.projectFinancing,	
			'seniorLoan' : $scope.seniorLoan,
			'juniorLoan' : $scope.juniorLoan,
			'financing' : $scope.financing
		};
		
		console.log("[createAsset]- inData = " + inData.address.country);
		console.log("[createAsset]- scope = " + $scope.address.country);
		
		$http.post("http://54.254.196.108:3000/asset/", inData).then(function (data, status, headers, config) { 
			console.log("[createAsset]- data = " + data);
			console.log("[createAsset]- status = " + status);
			console.log("[createAsset]- headers = " + headers);
			console.log("[createAsset]- config = " + config);
			$location.path("/asset");
			//alert("success"); 
		},function (data, status, headers, config) { 
			console.log("[createAsset]- data = " + data);
			console.log("[createAsset]- status = " + status);
			console.log("[createAsset]- headers = " + headers);
			console.log("[createAsset]- config = " + config);
			alert("error"); 
		});
	};
	
	
	//-----------------------------------------------------------------------------
	// Function displayAsset()
	// Role : display the new asset form page
	//-----------------------------------------------------------------------------
	$scope.displayAsset = function(name) {
		console.log("[displayAsset]- begin");
		console.log("[displayAsset]- name = "+name);
		
		$scope.name = name;
		$scope.developer = 			($scope.assetList)[name].developer;
		$scope.address = 				($scope.assetList)[name].address;
		$scope.currency = 			($scope.assetList)[name].currency;
		$scope.dateOfCreation = 	($scope.assetList)[name].dateOfCreation;
		$scope.dateOfCommission = 	($scope.assetList)[name].dateOfCommission;
		$scope.lifeDuration = 		($scope.assetList)[name].lifeDuration;
		$scope.energyType = 			($scope.assetList)[name].energyType;
		$scope.installedCapacity = ($scope.assetList)[name].installedCapacity;
		$scope.projectCosts = 		($scope.assetList)[name].projectCosts;
		$scope.totalCosts = 			($scope.assetList)[name].totalCosts;
		$scope.specificYield = 		($scope.assetList)[name].specificYield;
		$scope.degression = 			($scope.assetList)[name].degression;
		$scope.variableCosts = 		($scope.assetList)[name].variableCosts;		
		$scope.fixedCosts = 			($scope.assetList)[name].fixedCosts;
		$scope.projectFinancing = 	($scope.assetList)[name].projectFinancing;
		$scope.seniorLoan = 			($scope.assetList)[name].seniorLoan;
		$scope.juniorLoan = 			($scope.assetList)[name].juniorLoan;
		$scope.financing = 			($scope.assetList)[name].financing;
	}
	
	
	//-----------------------------------------------------------------------------
	// Function clear()
	// Role : display the new asset form page
	//-----------------------------------------------------------------------------
	$scope.clear = function() {
		//console.log("[clear]- begin");
	
		$scope.images = {
			image1: { src:'',	alt:''},
			image2: { src:'',	alt:''},
			image3: { src:'',	alt:''},
			image4: { src:'',	alt:''} };
	                      
		$scope.name = '';
		$scope.developer = '';
	
		$scope.address = {
			street: '',
			zipcode: '',
			city: '',
			province: '',
			country: '' };
	
		$scope.currency = '';
		$scope.dateOfCreation = '';
		$scope.dateOfCommission = '';
		
		$scope.lifeDuration = '';
		$scope.energyType = '';
		$scope.installedCapacity = '';
	
		$scope.projectCosts = { 
			investmentCost: '',
			setupCost: '',
			consultingCost: ' '
			};
		$scope.totalCosts = '';

		$scope.specificYield = '';
		$scope.degression = '';
		
		$scope.variableCosts = {
			insurance: '',
			security: '',
			technicalOps: '',
			salesOps: '',
			maintenance: '',
			lease: ''
		};
		
		$scope.fixedCosts = {
			generalAndAdmin: '',
			otherFixedCosts: ''
		};
	
		$scope.projectFinancing = {
			equity: '',
			seniorLoan: '',
			juniorLoan: ''
		};
		
		$scope.seniorLoan = {
			amount: '',
			duration: '',
			interestRate: ''
		};
		
		$scope.juniorLoan = {
			amount: '',
			duration: '',
			interestRate: ''
		};
		
		$scope.financing = {
			total: '',
			equityAmount: '',
			totalPerCent: ''
		};
	}
});
         

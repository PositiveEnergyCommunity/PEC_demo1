//-----------------------------------------------------------------------------
//	 PEC DEMO - login service
//  Dan DUONG - 01/12/2017
//
//-----------------------------------------------------------------------------
angular.module('pecDemo')
	.service('loginService', function($http, $localStorage) {
		var baseUrl = "http://localhost:3000";
      
		function changeUser(user) {
         console.log("[loginService- changeUser]- begin");
			angular.extend(currentUser, user);
      }

      function urlBase64Decode(str) {
         console.log("[loginService- urlBase64Decode]- begin");
			var output = str.replace('-', '+').replace('_', '/');
         switch (output.length % 4) {
            case 0:
               break;
            case 2:
               output += '==';
               break;
            case 3:
               output += '=';
               break;
            default:
               throw 'Illegal base64url string!';
         }
         return window.atob(output);
      }

      function getUserFromToken() {
			console.log("[loginService- getUserFromToken]- begin");
         var token = $localStorage.token;
         var user = {};
         if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
         }
         return user;
      }

      var currentUser = getUserFromToken();

      return {
         save: function(data, success, error) {
				console.log("[loginService- save]- begin");
            $http.post(baseUrl + '/signin', data).success(success).error(error)
         },
         signin: function(data, success, error) {
				console.log("[loginService- signin]- begin");
				console.log("[loginService- email]- data.email = " + data.email);
            $http.post(baseUrl + '/authenticate', data).success(success).error(error)
         },
         me: function(success, error) {
				console.log("[loginService- me]- begin");
            $http.get(baseUrl + '/me').success(success).error(error)
         },
         logout: function(success) {
            changeUser({});
            delete $localStorage.token;
            success();
         }
      };
   });



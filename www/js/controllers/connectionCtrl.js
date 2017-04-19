angular.module('app.controllers')

.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService, $state) {
	var id = "hrjkeghrhgkd";

	$scope.googlePlus = function() {
		window.plugins.googleplus.login(
		{'webClientId': '784894623300-gmkq3hut99f16n220kjimotv0os7vt2e.apps.googleusercontent.com',},
		function (responseGoogle) {
			$http({
				method: 'POST',
				url: 'http://webapp8.nantes.sii.fr/connect',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
				},
				data: {tokenid: responseGoogle.idToken}
			}).then(function successCallback(response) {
				alert(JSON.stringify(response));
				if (response.data == null){
					ConnectedUserService.setResponseGoogle(responseGoogle);
					$state.go('menu.inscription');
				}else{
					ConnectedUserService.setConnectedUser(response.data);
					ConnectedUserService.setResponseGoogle(responseGoogle);
					ConnectedUserService.setConnected("true");
					$window.history.back();
				}
			}, function erroCallabck(response) {
				alert("Erreur");
				alert(JSON.stringify(response));
			});
		},
		function (error) {
			alert("erreur: " + error);
		});
	}

	$scope.googlePlusLogOut = function() {
		window.plugins.googleplus.logout();
	}

	/*function onSuccess(googleUser) {
.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService','GoogleService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService,GoogleService) {
	var id = "";
	function onSuccess(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		console.log(googleUser);
		console.log(googleUser.getBasicProfile());
		id = googleUser.getAuthResponse().id_token;
		ConnectedUserService.setGoogleId(id);
		GoogleService.saveGU(googleUser);
		/*$http({
			method: 'POST',
			url: 'http://10.10.1.155/testToken',
			data: googleUser.getAuthResponse().id_token

		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
		});*/
	/*}
	function onFailure(error) {
		console.log(error);
	}

		gapi.signin2.render('my-signin2', {
			'redirect_uri': 'http://localhost/callback',
			'scope': 'openid',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': onSuccess,
			'onfailure': onFailure
		});*/

		$scope.signOut = function() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
			});
		}

			$scope.testConnect = function(){
				$state.go('menu.inscription');
				/*$http({
					method: 'POST',
					url: 'http://webapp8.nantes.sii.fr/connect',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
					//data: {tokenid: id, person: "{\"personID\":1,\"pseudo\":\"Pierre le stagiaire\",\"lastName\":\"Gaultier\",\"firstName\":\"Pierre\",\"job\":\"Stagiaire\",\"personEmail\":\"p.g@gmail.com\"}"}
					data: {tokenid: id}

					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
					},
					data: {tokenid: id}
				}).then(function successCallback(response) {
					console.log("message send");
					console.log(response);
				}, function erroCallabck(response) {
					console.log(response);
					console.log("Envoi token: Il y a eu des erreurs!");
				});*/
			}


	$scope.connection = function(){

		$http({
			method: 'GET',
			url: 'http://webapp8.nantes.sii.fr/' + '/getPersonById?id=' + document.getElementById("connection").value
			//url: 'http://NANTES-0156.sii.fr:4444/' + '/getPerson?id=' + document.getElementById("connction").value
		}).then(function successCallback(response) {
			console.log(response);
			ConnectedUserService.setConnectedUser(response.data);
			ConnectedUserService.setConnected("true");
			console.log("Connecté en tant que: ");
			console.log(ConnectedUserService.getConnectedUser());
			$window.history.back();
			//$window.location.href = '/#/side-menu21/page1';
		}, function erroCallabck(response) {
			alert('impossible de récupérer cette personne');
			alert('status: ' + response.status + ' / statusText: ' + response.statusText);
			console.log("Il y a eu des erreurs!");
		});
	}

}])

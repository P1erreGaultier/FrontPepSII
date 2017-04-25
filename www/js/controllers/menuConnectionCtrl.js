angular.module('app.controllers')

.controller('menuConnnectionCtrl', ['$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory', '$http','personService',
function ($stateParams, ConnectedUserService, $window, $state, $ionicHistory, $http, personService) {
	var vm = this;

		vm.isConnected = personService.getConnected();
		console.log(personService);
		console.log(personService.getConnected());
		console.log(personService.getConnectedUser());
		if (personService.getConnectedUser() != null){
			vm.connected = personService.getConnectedUser().Pseudo;
		}

		vm.showNavMenu = function() {
			var div = document.getElementById("navMenu");
			if (div.style.display == 'none'){
				div.style.display = 'block';
			}else{
				div.style.display = 'none';
			}
		}

		vm.googlePlus = function() {
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
					if (response.data == null){
						ConnectedUserService.setResponseGoogle(responseGoogle);
						$state.go('menu.inscription');
					}else{
						ConnectedUserService.setConnectedUser(response.data);
						ConnectedUserService.setResponseGoogle(responseGoogle);
						ConnectedUserService.setConnected("true");
						//$window.history.back();
						$state.reload();
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

		vm.logOut = function(){
			ConnectedUserService.setConnected("false");
			ConnectedUserService.setConnectedUser(null);
			window.plugins.googleplus.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.accueil', {}, {location: 'replace', reload: true})
			//$location.path('/#/side-menu21/page1').replace();
			//$window.location.reload();
		}

}])

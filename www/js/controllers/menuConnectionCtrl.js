angular.module('app.controllers')

.controller('menuConnnectionCtrl', ['$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory','personService',
function ($stateParams, ConnectedUserService, $window, $state, $ionicHistory, personService) {
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
			personService.connect();
		}

		vm.logOut = function(){
			personService.setConnected("false");
			personService.setConnectedUser(null);
			window.plugins.googleplus.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.accueil', {}, {location: 'replace', reload: true})
		}

}])

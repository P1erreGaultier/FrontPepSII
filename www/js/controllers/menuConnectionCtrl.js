angular.module('app.controllers')

.controller('menuConnnectionCtrl', ['$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory','personService',
function ($stateParams, ConnectedUserService, $window, $state, $ionicHistory, personService) {
	var vm = this;
	vm.showNavMenu = showNavMenu;
	vm.googlePlus = googlePlus;
	vm.logOut = logOut;

		vm.isConnected = personService.getConnected();
		console.log(personService);
		console.log(personService.getConnected());
		console.log(personService.getConnectedUser());
		if (personService.getConnectedUser() != null){
			vm.connected = personService.getConnectedUser().Pseudo;
		}

		function showNavMenu() {
			var div = document.getElementById("navMenu");
			if (div.style.display == 'none'){
				div.style.display = 'block';
			}else{
				div.style.display = 'none';
			}
		}

		function googlePlus() {
			personService.connect();
		}

		function logOut(){
			personService.setConnected("false");
			personService.setConnectedUser(null);
			window.plugins.googleplus.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.accueil', {}, {location: 'replace', reload: true})
		}

}])

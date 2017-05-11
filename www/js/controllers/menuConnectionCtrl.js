angular.module('app.controllers')

.controller('menuConnectionCtrl', ['$stateParams', '$window', '$state', '$ionicHistory','personService',
function ($stateParams, $window, $state, $ionicHistory, personService) {
	var vm = this;
	vm.loading = false;
	vm.showNavMenu = showNavMenu;
	vm.googlePlus = googlePlus;
	vm.logOut = logOut;

		vm.isConnected = personService.getConnected();
		if (personService.getConnectedUser() != null){
			vm.connected = personService.getConnectedUser().Pseudo;
			console.log(vm.connected);
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
			vm.loading = true;
			personService.connect().then(function(response){
				console.log("Logged in:");
				console.log(response);
			}).finally(function() {
				vm.loading = false;
			});
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

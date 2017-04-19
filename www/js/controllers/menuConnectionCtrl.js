angular.module('app.controllers')

.controller('menuConnnectionCtrl', ['$scope', '$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory',
function ($scope, $stateParams, ConnectedUserService, $window, $state, $ionicHistory) {
		$scope.isConnected = ConnectedUserService.isConnected();
		if (ConnectedUserService.getConnectedUser() != null){
			$scope.connected = ConnectedUserService.getConnectedUser().Pseudo;
		}

		$scope.showNavMenu = function() {
			var div = document.getElementById("navMenu");
			if (div.style.display == 'none'){
				div.style.display = 'block';
			}else{
				div.style.display = 'none';
			}
		}

		$scope.logOut = function(){
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

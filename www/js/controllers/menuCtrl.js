angular.module('app.controllers')
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'personService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $state, personService) {
	$scope.checkUser = function() {
		if (personService.getConnected() != "true"){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.connection', {}, {location: 'replace', reload: true});
		}else {
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.transitionTo('menu.mesVenements', {}, { reload: true, inherit: true, notify: true });
			//$state.go('menu.mesVenements', {}, {reload: true});
		}
	}
}])

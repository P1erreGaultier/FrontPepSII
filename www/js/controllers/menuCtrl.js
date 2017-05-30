angular.module('app.controllers')
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'personService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $state, personService) {

	var vm = this;
	vm.checkUserMyEvent = checkUserMyEvent;
	vm.checkUserSuggestion = checkUserSuggestion;

	function checkUserMyEvent() {
		if (personService.getConnected() != "true"){
			alert("Vous devez être connécté pour pouvoir accéder à vos évènements.");
		}else {
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.transitionTo('menu.mesVenements', {}, { reload: true, inherit: true, notify: true });
		}
	}

	function checkUserSuggestion() {
		if (personService.getConnected() != "true"){
			alert("Vous devez être connécté afin de pouvoir faire des suggestions.");
		}else {
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.transitionTo('menu.suggestion', {}, { reload: true, inherit: true, notify: true });
		}
	}
}])

angular.module('app.controllers')

.controller('suggestionCtrl', ['$stateParams','$state','suggestion',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $state, suggestion) {

	var vm = this;
	vm.saveSuggestion = saveSuggestion;

	function saveSuggestion() {
		suggestion.saveSuggestion();
	}

}])

angular.module('app.controllers')

.controller('suggestionCtrl', ['$stateParams','$state','suggestion', 'personService','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $state, suggestion, personService, $filter) {

	var vm = this;
	vm.saveSuggestion = saveSuggestion;

	function saveSuggestion() {
		var date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm')
		var tokenId = personService.getResponseGoogle().idToken;
		var suggestionToSend = {
			"Text" : document.getElementById("text").value,
			"Job" : personService.getConnectedUser().Job,
			"Date" : date
		};
		alert(tokenId)
		alert(JSON.stringify(suggestionToSend))
		suggestion.saveSuggestion(tokenId, suggestionToSend);
	}

}])

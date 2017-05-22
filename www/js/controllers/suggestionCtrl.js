angular.module('app.controllers')

.controller('suggestionCtrl', ['$stateParams','$state','suggestion', 'personService','$filter', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $state, suggestion, personService, $filter, $ionicHistory) {

	var vm = this;
	vm.saveSuggestion = saveSuggestion;
	vm.errorSuggestion = false;

	function saveSuggestion() {
		var send = true;
		vm.errorSuggestion = false;
		if(document.getElementById("text").value.trim() == "") {
			send = false;
			vm.errorSuggestion = true;
		}

		if (send) {
			var date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm')
			var tokenId = personService.getResponseGoogle().idToken;
			var suggestionToSend = {
				"Text" : document.getElementById("text").value,
				"Job" : personService.getConnectedUser().Job,
				"Date" : date
			};
			suggestion.saveSuggestion(tokenId, suggestionToSend)
			.then(function(response){
				alert("coucou");
				alert($ionicHistory);
				alert(JSON.stringify($ionicHistory));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
	      $state.go('menu.accueil', {}, {location: 'replace', reload: true})
			})
		}
	}

}])

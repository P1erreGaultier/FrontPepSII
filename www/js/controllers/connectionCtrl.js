angular.module('app.controllers')

.controller('connectionCtrl', ['$stateParams', '$window', '$http', 'ConnectedUserService', '$state','personService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $http, ConnectedUserService, $state, personService) {
	var vm = this;
	vm.connection = connection;

	 function connection (){
		personService.getPersonById(document.getElementById("connection").value)
		.then(function successCallback(response) {
			personService.setConnectedUser(response);
			personService.setConnected("true");
			console.log("Connecté en tant que: ");
			console.log(personService.connectedUser);
			console.log(personService.connected);
			$window.history.back();
		}, function erroCallabck(response) {
			alert('impossible de récupérer cette personne');
			alert('status: ' + response.status + ' / statusText: ' + response.statusText);
			console.log("Il y a eu des erreurs!");
		});
	}

}])

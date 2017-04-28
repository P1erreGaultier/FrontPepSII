angular.module('app.controllers')
.controller('inscriptionCtrl', ['$stateParams','$http','personService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams,$http,personService) {
	var vm = this;
	vm.inscription = inscription;

	alert(JSON.stringify(personService.getResponseGoogle()));
	function inscription(){
		var responseGoogle = personService.getResponseGoogle();
		var personToSend = {
			"Pseudo" : document.getElementById("pseudo").value,
			"LastName" : responseGoogle.familyName,
			"FirstName" : responseGoogle.givenName,
			"Job" : document.getElementById("job").value,
			"PersonEmail" : responseGoogle.email
		};
 		personService.registerPerson(responseGoogle.idToken, personToSend )
}
}])

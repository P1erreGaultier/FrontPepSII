angular.module('app.controllers')
.controller('inscriptionCtrl', ['$stateParams','$http','personService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams,$http,personService) {
	var vm = this;
	alert(JSON.stringify(personService.getResponseGoogle()));
	vm.inscription= function(){
		var responseGoogle = personService.getResponseGoogle();
		var personToSend = {
			"Pseudo" : document.getElementById("pseudo").value,
			"LastName" : responseGoogle.familyName,
			"FirstName" : responseGoogle.givenName,
			"Job" : document.getElementById("job").value,
			"PersonEmail" : responseGoogle.email
		};
		alert(JSON.stringify(personToSend));
		$http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/registerPerson',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid: responseGoogle.idToken, person: JSON.stringify(personToSend)}
		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
			alert(JSON.stringify(response));
		});
}

}])

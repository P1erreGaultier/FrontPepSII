angular.module('app.controllers')

.controller('profilCtrl', ['$scope', '$stateParams','personService',
function ($scope, $stateParams, personService) {

	var vm = this;
	vm.user =
	vm.canModify = "false";
	vm.saveProfil = saveProfil;
	vm.modify = modify;
	vm.modifyBack = modifyBack;
	vm.images = {};
	vm.getGoogleImage = getGoogleImage;
	console.log(personService.getResponseGoogle());

	function saveProfil() {
		var save = true;
		if (document.getElementById("pseudoInput").value.trim() == ""){
			document.getElementById("pseudo").innerText = "Votre pseudo ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("pseudo").innerText = "Pseudo: ";
		}
		if (document.getElementById("firstNameInput").value.trim() == ""){
			document.getElementById("firstName").innerText = "Votre prenom ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("firstName").innerText = "Prenom: ";
		}
		if (document.getElementById("lastNameInput").value.trim() == ""){
			document.getElementById("lastName").innerText = "Votre nom ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("lastName").innerText = "Nom: ";
		}
		if (save){
			var personToSend = {
				"PersonId": personService.getConnectedUser().PersonId,
				"Pseudo" : document.getElementById("pseudoInput").value,
				"LastName" : document.getElementById("lastNameInput").value,
				"FirstName" : document.getElementById("firstNameInput").value,
				"Job" : document.getElementById("jobInput").value,
				"PersonEmail" : personService.getConnectedUser().PersonEmail
			};
			personService.registerPerson(personService.getResponseGoogle().idToken, personToSend)
			.then(function successCallback(response) {
				console.log("message send");
				console.log(response);
				var userResponse = response.data;
				personService.setConnectedUser(userResponse);
				vm.user = userResponse;
				vm.canModify = "false";
			}, function erroCallabck(response) {
				alert('erreur');
				console.log(response);
				console.log("Envoi formulaire modification personne: Il y a eu des erreurs!");
			});
		}
	}

	function modify() {
		vm.canModify = "true";
	}

	function modifyBack() {
		vm.canModify = "false";
	}

	function getGoogleImage(email){
		var res = personService.getGooglePicture(email)
		.then(function(result){
			if (!(email in vm.images)){
				vm.images[email]=result;
			}
			return result;
		})
		.catch(function(error){console.log(error)});
		return res;
	}

}])

angular.module('app.controllers')

.controller('profilCtrl', ['$scope', '$stateParams','ConnectedUserService','personService',
function ($scope, $stateParams, ConnectedUserService, personService) {

	var vm = this;
	vm.user = personService.getConnectedUser();
	vm.personID = vm.user.PersonID;
	vm.pseudo = vm.user.Pseudo;
	vm.lastName = vm.user.LastName;
	vm.firstName = vm.user.FirstName;
	vm.job = vm.user.Job;
	vm.canModify = "false";

	vm.saveProfil = saveProfil;
	vm.modify = modify;
	vm.modifyBack = modifyBack;

	console.log(personService.getConnectedUser());

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
				"Pseudo" : document.getElementById("pseudoInput").value,
				"LastName" : document.getElementById("lastNameInput").value,
				"FirstName" : document.getElementById("firstNameInput").value,
				"Job" : document.getElementById("jobInput").value,
				"PersonEmail" : personService.getConnectedUser().personEmail
			};
			personService.registerPerson(ConnectedUserService.getGoogleId(), personToSend)
			.then(function successCallback(response) {
				console.log("message send");
				console.log(vm.user.personID);
				console.log(response);
				var userResponse = response.data;
				vm.personID = userResponse.PersonID;
				vm.pseudo = userResponse.Pseudo;
				vm.lastName = userResponse.LastName;
				vm.firstName = userResponse.FirstName;
				vm.job = userResponse.Job;
				personService.connectedUser=userResponse;
				vm.canModify = "false";
				alert("Modification enregistrées");
				alert(JSON.stringify(response));
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
				alert(JSON.stringify(response));
			});
		}
	}

	function modify() {
		vm.canModify = "true";
	}

	function modifyBack() {
		vm.canModify = "false";
	}

}])

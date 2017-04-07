angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('profilCtrl', ['$scope', '$stateParams','ConnectedUserService','$http',
function ($scope, $stateParams, ConnectedUserService, $http) {
	var user = ConnectedUserService.getConnectedUser();
	$scope.personID = user.personID;
	$scope.pseudo = user.pseudo;
	$scope.lastName = user.lastName;
	$scope.firstName = user.firstName;
	$scope.job = user.job;
	$scope.canModifiy = "false";

	$scope.saveProfil = function(){
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

			$http({
				method: 'POST',
				url : 'http://webapp8.nantes.sii.fr/addPerson',
				//url: 'http://NANTES-0156.sii.fr:4444/addPerson',
				data: {
					personID: $scope.personID,
					pseudo: document.getElementById("pseudoInput").value,
					lastName: document.getElementById("lastNameInput").value,
					firstName: document.getElementById("firstNameInput").value,
					job: document.getElementById("jobInput").value
				}
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(user.personID);
				console.log(response);
				var userResponse = response.data;
				$scope.personID = userResponse.personID;
				$scope.pseudo = userResponse.pseudo;
				$scope.lastName = userResponse.lastName;
				$scope.firstName = userResponse.firstName;
				$scope.job = userResponse.job;
				ConnectedUserService.setConnectedUser(userResponse);
				$scope.canModifiy = "false";
				alert("Modification enregistrées");
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
			});
		}
	}

	$scope.modify = function(){
		$scope.canModifiy = "true";
	}

	$scope.modifyBack = function(){
		$scope.canModifiy = "false";
	}

}])

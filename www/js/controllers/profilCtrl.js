angular.module('app.controllers')

.controller('profilCtrl', ['$scope', '$stateParams','ConnectedUserService','$http',
function ($scope, $stateParams, ConnectedUserService, $http) {
	var user = ConnectedUserService.getConnectedUser();
	$scope.personID = user.PersonID;
	$scope.pseudo = user.Pseudo;
	$scope.lastName = user.LastName;
	$scope.firstName = user.FirstName;
	$scope.job = user.Job;
	$scope.canModifiy = "false";
	console.log(ConnectedUserService.getConnectedUser());

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
				url : 'http://webapp8.nantes.sii.fr/registerPerson?id=' + ConnectedUserService.getGoogleId(),
				//url: 'http://NANTES-0156.sii.fr:4444/addPerson',
				data: {
					personID: $scope.personID,
					pseudo: document.getElementById("pseudoInput").value,
					lastName: document.getElementById("lastNameInput").value,
					firstName: document.getElementById("firstNameInput").value,
					job: document.getElementById("jobInput").value,
					personEmail: ConnectedUserService.getConnectedUser().personEmail
				},
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(user.personID);
				console.log(response);
				var userResponse = response.data;
				$scope.personID = userResponse.PersonID;
				$scope.pseudo = userResponse.Pseudo;
				$scope.lastName = userResponse.LastName;
				$scope.firstName = userResponse.FirstName;
				$scope.job = userResponse.Job;
				ConnectedUserService.setConnectedUser(userResponse);
				$scope.canModifiy = "false";
				alert("Modification enregistrées");
				alert(JSON.stringify(response));
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
				alert(JSON.stringify(response));
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

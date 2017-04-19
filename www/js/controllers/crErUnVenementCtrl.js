angular.module('app.controllers')

.controller('crErUnVenementCtrl', ['$scope', '$stateParams','$window', '$cordovaDatePicker', '$http','EventService','ConnectedUserService', '$ionicHistory', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $cordovaDatePicker, $http, EventService, ConnectedUserService, $ionicHistory, $state) {
	console.log("Creation d'un evenement");
	$scope.minDate = new Date().toDateString();
	$scope.saveEvent = function(){
		var send = true;

		if(document.getElementById("selectedDate").value == ""){
			$scope.erreurDate = ": Date invalide"
			send= false;
		}else{
			$scope.erreurDate = ""
		}
		if(document.getElementById("horaireDebut").value == ""){
			$scope.erreurHoraireDebut = ": Heure invalide";
			send = false;
		}else{
			$scope.erreurHoraireDebut = "";
		}
		if(document.getElementById("horaireFin").value == ""){
			$scope.erreurHoraireFin = ": Heure invalide";
			send = false;
		}else{
			$scope.erreurHoraireFin = "";
		}
		if(document.getElementById("lieu").value == ""){
			$scope.erreurLieu = ": Lieu invalide";
			send = false;
		}else {
			$scope.erreurLieu = ""
		}

		if (send){
			var ownerToSend = ConnectedUserService.getConnectedUser();
			var responseGoogle = ConnectedUserService.getResponseGoogle();
			var eventToSend = {
				"Name" : document.getElementById("nomEvenement").value,
				"DateStart" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
				"DateEnd" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
				"PlaceId" : "ChIJy6rbS_brBUgRXzWPvQ0FDXg",
				"Description": document.getElementById("description").value,
				"Image" : document.getElementById("image").value,
				"IsCanceled" : 0,
				"Owner" : ownerToSend
			};
			alert(JSON.stringify(eventToSend));
			$http({
				method: 'POST',
				url: 'http://webapp8.nantes.sii.fr/saveEvent',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: {tokenid: responseGoogle.idToken, event: JSON.stringify(eventToSend)}
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(response);
				alert(JSON.stringify(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('menu.accueil', {}, {location: 'replace', reload: true})
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi token: Il y a eu des erreurs!");
				alert(JSON.stringify(response));
			});
		}

	}

}])

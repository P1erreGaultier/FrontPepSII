angular.module('app.controllers')

.controller('crErUnVenementCtrl', ['$stateParams','$window', '$cordovaDatePicker', '$http','EventService','ConnectedUserService', '$ionicHistory', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $cordovaDatePicker, $http, EventService, ConnectedUserService, $ionicHistory, $state) {
	var vm = this;

	console.log("Creation d'un evenement");
	vm.placeid=$window.location.href.substring(45);
	vm.minDate = new Date().toDateString();
	vm.saveEvent = function(){
		var send = true;


		if(document.getElementById("selectedDate").value == ""){
			vm.erreurDate = ": Date invalide"
			send= false;
		}else{
			vm.erreurDate = ""
		}
		if(document.getElementById("horaireDebut").value == ""){
			vm.erreurHoraireDebut = ": Heure invalide";
			send = false;
		}else{
			vm.erreurHoraireDebut = "";
		}
		if(document.getElementById("horaireFin").value == ""){
			vm.erreurHoraireFin = ": Heure invalide";
			send = false;
		}else{
			vm.erreurHoraireFin = "";
		}
		if(document.getElementById("lieu").value == ""){
			vm.erreurLieu = ": Lieu invalide";
			send = false;
		}else {
			vm.erreurLieu = ""
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

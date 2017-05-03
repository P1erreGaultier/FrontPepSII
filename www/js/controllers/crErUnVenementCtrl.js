angular.module('app.controllers')

.controller('crErUnVenementCtrl', ['$stateParams','$window', '$cordovaDatePicker', '$http','eventService', '$ionicHistory', '$state', 'personService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $cordovaDatePicker, $http, eventService, $ionicHistory, $state, personService) {
	var vm = this;
	vm.placeid;
	vm.minDate;
	vm.saveEvent = saveEvent;

	activate();

	function activate() {
		vm.placeid=$window.location.href.substring(45);
		vm.minDate = new Date().toDateString();
	}

	function saveEvent() {
		vm.send = true;
		if(document.getElementById("selectedDate").value == ""){
			vm.erreurDate = ": Date invalide"
			vm.send= false;
		}else{
			vm.erreurDate = ""
		}
		if(document.getElementById("horaireDebut").value == ""){
			vm.erreurHoraireDebut = ": Heure invalide";
			vm.send = false;
		}else{
			vm.erreurHoraireDebut = "";
		}
		if(document.getElementById("horaireFin").value == ""){
			vm.erreurHoraireFin = ": Heure invalide";
			vm.send = false;
		}else{
			vm.erreurHoraireFin = "";
		}
		if(document.getElementById("lieu").value == ""){
			vm.erreurLieu = ": Lieu invalide";
			vm.send = false;
		}else {
			vm.erreurLieu = ""
		}

		if (vm.send){
			var ownerToSend = personService.getConnectedUser();
			var responseGoogle = personService.getResponseGoogle();
			var eventType = {
				"EventTypeId" : 2,
				"Type" : "AfterWork"
			}
			var eventToSend = {
				"Name" : document.getElementById("nomEvenement").value,
				"DateStart" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
				"DateEnd" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
				"PlaceId" : "ChIJy6rbS_brBUgRXzWPvQ0FDXg",
				"Description": document.getElementById("description").value,
				"Image" : document.getElementById("image").value,
				"IsCanceled" : 0,
				"Owner" : ownerToSend,
				"EventType" : eventType
			};
			alert(JSON.stringify(eventToSend));
			eventService.registerEvent(responseGoogle.idToken,eventToSend);
		}
	}
}])

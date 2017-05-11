angular.module('app.controllers')

.controller('crErUnVenementCtrl', ['$stateParams','$window', '$cordovaDatePicker', '$http','eventService', '$ionicHistory', '$state', 'personService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $cordovaDatePicker, $http, eventService, $ionicHistory, $state, personService) {
	var vm = this;

	vm.minDate;
	vm.eventTypes;
	vm.getAllEventType = getAllEventType;
	vm.saveEvent = saveEvent;
	vm.selectPlaceId = selectPlaceId;

	activate();

	function activate() {
		vm.minDate = new Date().toDateString();
		getAllEventType();
		vm.placeid = eventService.getEventId();
		vm.placename = eventService.getEventName();
	}

	function getAllEventType() {
		return eventService.getAllEventType()
			.then(function(data) {
				vm.eventTypes = data;
				return vm.eventTypes;
			});
	}

	function selectPlaceId() {
		$state.go('menu.carte', {}, {location: 'replace', reload: false})
	}

	function saveEvent() {
		vm.send = true;
		if(document.getElementById("selectedDate").value == ""){
			vm.erreurDate = ": Date invalide";
			vm.send= false;
		}else{
			vm.erreurDate = "";
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
			vm.erreurLieu = "";
		}

		if (vm.send){
			var type = vm.eventTypes[document.getElementById("type").value - 1];
			var eventToSend = {
				"EventTypeId": type.EventTypeId,
				"Type": type.Type
			}
			var ownerToSend = personService.getConnectedUser();
			var responseGoogle = personService.getResponseGoogle();
			var eventToSend = {
				"Name" : document.getElementById("nomEvenement").value,
				"DateStart" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
				"DateEnd" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
				"PlaceId" : document.getElementById("lieu").value,
				"Description": document.getElementById("description").value,
				"Image" : document.getElementById("image").value,
				"IsCanceled" : 0,
				"Owner" : ownerToSend,
				"EventType" : eventToSend
			};
			alert(JSON.stringify(eventToSend));
			eventService.registerEvent(responseGoogle.idToken,eventToSend);
		}
	}
}])

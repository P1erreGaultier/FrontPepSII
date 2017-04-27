angular.module('app.controllers')

.controller('detailsEventCtrl', ['$stateParams', '$window', '$http','eventService','personService','commentService','participantService', '$state', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $http, eventService,personService,commentService,participantService, $state, $filter) {
	var vm = this;
	vm.registerUserToEvent = registerUserToEvent;
	vm.unregisterUserToEvent = unregisterUserToEvent;
	vm.getCommentMargin = getCommentMargin;
	vm.cancelEvent = cancelEvent;
	vm.detailsParticipant = detailsParticipant;
	vm.event;
	activate();

	function activate(){
		vm.event = eventService.getEvent();
	}

	function registerUserToEvent () {
		participantService.saveParticipant(personService.getResponseGoogle().idToken, personService.getConnectedUser().PersonId, eventService.getEvent().EventId);
	}

	function unregisterUserToEvent() {
		participantService.cancelParticipation(personService.getResponseGoogle().idToken, personService.getConnectedUser().PersonId, eventService.getEvent().EventId);
	}

	function getCommentMargin(owner){
		if (owner == null){
			return "0%";
		}else {
			return "5%";
		}
	}

	function cancelEvent() {
		var responseGoogle = personService.getResponseGoogle();
		var eventToSend = {
			"EventId" : vm.event.EventId,
			"Name" : vm.event.Name,
			"DateStart" : vm.event.DateStart,
			"DateEnd" : vm.event.DateEnd,
			"PlaceId" : vm.event.PlaceId,
			"Description": vm.event.Description,
			"Image" : vm.event.Image,
			"IsCanceled" : 1,
			"Owner" : vm.event.Owner
		};
		eventService.registerEvent(responseGoogle.idToken,eventToSend);
		alert('Votre évènement à bien été annulé');
	}

	function detailsParticipant(){
		var div = document.getElementById("participantDiv");
		if (div.style.display == 'none'){
			div.style.display = 'block';
		}else{
			div.style.display = 'none';
		}
	}

	vm.dateOfDay = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
	if (personService.getConnectedUser() == null){
		vm.connectedUser = -1;
	} else {
		vm.connectedUser = personService.getConnectedUser().PersonId;
	}

	commentService.getCommentByEvent(vm.event.EventId)
	.then(function successCallback(response) {
		vm.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
		console.log(response);
	});

	participantService.getAllParticipantById(vm.event.EventId)
	.then(function successCallback(response) {
		console.log(response);
		vm.ListParticipant = response;
		vm.nbParticipants = vm.ListParticipant.length;
		if (personService.getConnectedUser() == null){
			vm.isRegister = "null";
		}else {
			var isRegister = "false";
			for(i=0;i<vm.ListParticipant.length;i++){
				if(vm.ListParticipant[i].PersonId == personService.getConnectedUser().PersonId){
					isRegister = "true";
				}
			}
			if (isRegister == "true"){
				vm.isRegister = "true";
			}else{
				vm.isRegister = "false";
			}
		}
		console.log("isRegister");
		console.log(vm.isRegister);
	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
		console.log(response);
	});

}])

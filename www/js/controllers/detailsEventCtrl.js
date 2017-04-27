angular.module('app.controllers')

.controller('detailsEventCtrl', ['$stateParams', '$window', '$http','eventService','personService', '$state', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $http, eventService,personService, $state, $filter) {
	var vm = this;

	vm.saveReview = saveReview;
	vm.event = eventService.getEvent();

	vm.registerUserToEvent = function() {
		var responseGoogle = personService.getResponseGoogle();
		$http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/saveParticipant',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid:responseGoogle.idToken, person: personService.getConnectedUser().PersonId, event: eventService.getEvent().EventId}
		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
			$window.location.reload();
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
			alert(JSON.stringify(response));
		});
	}

	vm.unregisterUserToEvent = function() {
		var responseGoogle = personService.getResponseGoogle();
		$http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/cancelParticipation',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid:responseGoogle.idToken, person: personService.getConnectedUser().PersonId, event: eventService.getEvent().EventId}
		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
			$window.location.reload();
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
			alert(JSON.stringify(response));
		});
	}

	var event = eventService.getEvent();
	vm.getCommentMargin = function(owner){
		if (owner == null){
			return "0%";
		}else {
			return "5%";
		}
	}

	vm.cancelEvent = function() {
		var responseGoogle = personService.getResponseGoogle();
		var eventToSend = {
			"EventId" : event.EventId,
			"Name" : event.Name,
			"DateStart" : event.DateStart,
			"DateEnd" : event.DateEnd,
			"PlaceId" : event.PlaceId,
			"Description": event.Description,
			"Image" : event.Image,
			"IsCanceled" : 1,
			"Owner" : event.Owner
		};
		eventService.registerEvent(responseGoogle.idToken,eventToSend);
		alert('Votre évènement à bien été annulé');
	}

	vm.detailsParticipant = function(){
		var div = document.getElementById("participantDiv");
		if (div.style.display == 'none'){
			div.style.display = 'block';
		}else{
			div.style.display = 'none';
		}
	}

	vm.TitleEvent = event.Name;
	vm.sourceImgEvent = event.Image;
	vm.descriptionEvent = event.Description;
	vm.dateStartEvent = event.DateStart;
	vm.owner = event.Owner.PersonId;
	vm.dateOfDay = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
	console.log(vm.dateOfDay);
	console.log(vm.dateStartEvent);
	console.log(vm.dateOfDay > vm.dateStartEvent);
	if (personService.getConnectedUser() == null){
		vm.connectedUser = -1;
	} else {
		vm.connectedUser = personService.getConnectedUser().PersonId;
	}

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/' + 'getCommentByEvent?id=' + event.EventId
	}).then(function successCallback(response) {
		vm.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
		console.log(response);
	});

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/getAllParticipantById?id=' + event.EventId
	}).then(function successCallback(response) {
		vm.ListParticipant = response.data;
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

	vm.displayRateForm = function() {
		document.getElementById("ratingForm").style.display = "block";
		document.getElementById("beforeRate").style.display = "none";
	}

	vm.hideRateForm = function() {
		document.getElementById("ratingForm").style.display = "none";
		document.getElementById("beforeRate").style.display = "block";
	}

	vm.noteEvent = function() {
		var note = document.getElementById("note").value;
		var comment = document.getElementById("comment").value;
		console.log(note);
		console.log(comment);
		var saveReviewPromise = vm.saveReview(personService.getResponseGoogle().idToken, personService.getConnectedUser().PersonId, vm.event.EventId, note, comment);
		saveReviewPromise.then(function(result){
			alert("Vous avez donné la note de " + note + " à l'évènement!")
			alert(comment);
			alert(JSON.stringify(result));
			vm.hideRateForm();
		})
	}


	function saveReview(idToken, personToSend, eventToSend, rateToSend, textToSend){
		alert('Dans saveReview');
		return $http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/updateReview',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid: idToken, personid: personToSend, eventid: eventToSend, rate: rateToSend, text: textToSend}
		})
			.then(saveReviewComplete)
			.catch(saveReviewFailed);

		function saveReviewComplete(response) {
			alert(JSON.stringify(response));
			return response;
		}
		function saveReviewFailed(response){
			console.log("Error: saveReviewFailed");
			console.log(response);
			alert(JSON.stringify(response));
			return response;
		}
	};

}])

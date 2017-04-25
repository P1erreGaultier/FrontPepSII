angular.module('app.controllers')

.controller('detailsEventCtrl', ['$stateParams', '$window', '$http','eventService','ConnectedUserService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $http, eventService,ConnectedUserService, $state) {
	var vm = this;

	vm.RegisterUserToEvent = function() {
		var responseGoogle = ConnectedUserService.getResponseGoogle();
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
			data: {tokenid:responseGoogle.idToken, person: ConnectedUserService.getConnectedUser().PersonId, event: eventService.getEvent().EventId}
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

	vm.UnregisterUserToEvent = function() {
		var responseGoogle = ConnectedUserService.getResponseGoogle();
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
			data: {tokenid:responseGoogle.idToken, person: ConnectedUserService.getConnectedUser().PersonId, event: eventService.getEvent().EventId}
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

		if (ConnectedUserService.getConnectedUser() == null){
			vm.isRegister = "null";
		}else {
			var isRegister = "false";
			for(i=0;i<vm.ListParticipant.length;i++){
				if(vm.ListParticipant[i].PersonId == ConnectedUserService.getConnectedUser().PersonId){
					isRegister = "true";
				}
			}
			if (isRegister == "true"){
				vm.isRegister = "true";
			}else{
				vm.isRegister = "false";
			}
		}

	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
		console.log(response);
	});


}])

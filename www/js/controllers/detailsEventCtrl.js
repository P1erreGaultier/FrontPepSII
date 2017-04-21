angular.module('app.controllers')

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$window', '$http','EventService','ConnectedUserService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, EventService,ConnectedUserService, $state) {

	$scope.RegisterUserToEvent = function() {
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
			data: {tokenid:responseGoogle.idToken, person: ConnectedUserService.getConnectedUser().PersonId, event: EventService.getEvent().EventId}
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

	$scope.UnregisterUserToEvent = function() {
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
			data: {tokenid:responseGoogle.idToken, person: ConnectedUserService.getConnectedUser().PersonId, event: EventService.getEvent().EventId}
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

	var event = EventService.getEvent();
	$scope.getCommentMargin = function(owner){
		if (owner == null){
			return "0%";
		}else {
			return "5%";
		}
	}
	$scope.detailsParticipant = function(){
		var div = document.getElementById("participantDiv");
		if (div.style.display == 'none'){
			div.style.display = 'block';
		}else{
			div.style.display = 'none';
		}
	}
	$scope.TitleEvent = event.Name;
	$scope.sourceImgEvent = event.Image;
	$scope.descriptionEvent = event.Description;
	$scope.dateStartEvent = event.DateStart;

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/' + 'getCommentByEvent?id=' + event.EventId
	}).then(function successCallback(response) {
		$scope.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
		console.log(response);
	});

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/getAllParticipantById?id=' + event.EventId
	}).then(function successCallback(response) {
		$scope.ListParticipant = response.data;
		$scope.nbParticipants = $scope.ListParticipant.length;

		if (ConnectedUserService.getConnectedUser() == null){
			$scope.isRegister = "null";
		}else {
			var isRegister = "false";
			for(i=0;i<$scope.ListParticipant.length;i++){
				if($scope.ListParticipant[i].PersonId == ConnectedUserService.getConnectedUser().PersonId){
					isRegister = "true";
				}
			}
			if (isRegister == "true"){
				$scope.isRegister = "true";
			}else{
				$scope.isRegister = "false";
			}
		}

	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
		console.log(response);
	});


}])

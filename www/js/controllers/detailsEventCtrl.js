angular.module('app.controllers')

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$window', '$http','EventService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, EventService) {
	$scope.getBase64Image = function(img) {
		var canvas = document.createElement("canvas");
	  canvas.width = img.width;
	  canvas.height = img.height;
	  var ctx = canvas.getContext("2d");
	  ctx.drawImage(img, 0, 0);
	  var dataURL = canvas.toDataURL("image/png");
	  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
		console.log(response);
	});

	$scope.uploadImage = function(){
		$http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/saveEvent',
			data: {
				id: event.id,
				Name: event.Name,
				Datestart: event.Datestart,
				Dateend: event.Dateend,
				Placeid: event.Placeid,
				Description: event.Description,
				Image: "",
				Iscanceled: 0,
				Owner: event.Owner
			}
		}).then(function successCallback(response) {
			alert("Image enregistrée!");
			console.log(response);
		}, function erroCallabck(response) {
			console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
		});
	}
	/*console.log($stateParams.event)
	console.log($stateParams.event.Name)*/
}])

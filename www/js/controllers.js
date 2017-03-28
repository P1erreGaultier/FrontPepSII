angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('menuConnnectionCtrl', ['$scope', '$stateParams', 'ConnectedUserService', '$window', '$location',
function ($scope, $stateParams, ConnectedUserService, $window, $location) {
		$scope.isConnected = ConnectedUserService.IsConnected();
		if (ConnectedUserService.getConnectedUser() != null){
			$scope.connectedUser = ConnectedUserService.getConnectedUser().pseudo;
		}

		$scope.logOut = function(){
			ConnectedUserService.setConnected("false");
			ConnectedUserService.setConnectedUser(null);
			$scope.isConnected = ConnectedUserService.IsConnected();
			$location.path('/#/side-menu21/page1');
			$window.location.reload();
		}

}])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'CustomFactory', 'BlankService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, CustomFactory, BlankService) {
		console.log("coucou");
		BlankService.sendMessage();
		$http({
  	method: 'GET',
  	url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.ListEvent = response.data.ArrayList;

		for(i=0; i<$scope.ListEvent.length; i++){
			$scope.ListEvent[i].Datestart = Date.parse($scope.ListEvent[i].Datestart);
		}

		$scope.passEvent = function (event){
			CustomFactory.saveEvent(event);
		}
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs");
		console.log(response);
		});

}])

.controller('rechercheCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('carteCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

	$scope.addMarker = function (texte, numero){
		var mark = new google.maps.Marker({position:new google.maps.LatLng(Math.random()+47, Math.random()-1.8)});
		mark.setMap($scope.map);
		var infoEvent = new google.maps.InfoWindow({
			content: "<div style=\"display:inline-block\"><img src=\"img/logo.png\"style=\"display:inline;width:50px;height:50px;\"></div>" +
					"<div style=\"display:inline-block\"><p>" + texte + " Le " + numero + "</p><p>***</p></div>"
		});
		mark.addListener('click', function(){
			infoEvent.open($scope.map, mark);
		})
	}


	$http({
		method: 'GET',
		url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		$scope.ListEvent = response.data.ArrayList;

		var options = {timeout: 10000, enableHighAccuracy: true};
		var latLng = new google.maps.LatLng(47.2112216, -1.5570168);
		var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		for (var i=0; i<$scope.ListEvent.length; i++){
			$scope.addMarker($scope.ListEvent[i].Name, i);
		}

		var marker = new google.maps.Marker({position:new google.maps.LatLng(47.2112216, -1.5570168)});
		marker.setMap($scope.map);
		var infowindow = new google.maps.InfoWindow({
			content: "<div style=\"display:inline-block\"><img src=\"img/logo.png\"style=\"display:inline;width:50px;height:50px;\"></div>" +
					"<div style=\"display:inline-block\"><p>22 rue oui</p><p>***</p></div>"
		});

		marker.addListener('click', function() {
			infowindow.open($scope.map, marker);
			});

	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs dans la map!")
	});

}])

.controller('footEnSalleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  //sum to test jasmine/karma
  $scope.sum = function() {
   $scope.z = $scope.x + $scope.y;
  };

}])

.controller('afterworkCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('dejTechCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mesVenementsCtrl', ['$scope', '$stateParams', '$cordovaDatePicker',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaDatePicker) {

}])

.controller('crErUnVenementCtrl', ['$scope', '$stateParams','$window', '$cordovaDatePicker', '$http','CustomFactory','ConnectedUserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $cordovaDatePicker, $http, CustomFactory, ConnectedUserService) {
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
			console.log(ownerToSend);
			$http({
				method: 'POST',
				url: 'http://localhost:4444/saveEvent',
				data: {
					Name: document.getElementById("nomEvenement").value,
					Datestart: document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
					Dateend: document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
					Placeid: document.getElementById("lieu").value,
					Description: document.getElementById("description").value,
					Image: document.getElementById("image").value,
					Iscanceled: 0,
					Owner: ownerToSend
				}
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(response.data.Event);
				CustomFactory.saveEvent(response.data.Event);
				$window.location.href = '/#/side-menu21/page13';
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
			});
		}

	}

}])


.controller('suggestionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, ConnectedUserService) {

}])

.controller('evaluerEvenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$window', '$http','CustomFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, CustomFactory) {

	var event = CustomFactory.getEvent();
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
	$scope.sourceImgEvent = "img/defaultImage.jpg";
	$scope.descriptionEvent = event.Description;
	$scope.dateStartEvent = event.Datestart;

	/*$http({
		method: 'GET',
		url: 'http://NANTES-0156.sii.fr:4444/' + 'getCommentByEvent?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
	});

	$http({
		method: 'GET',
		url: 'http://localhost:4444/getAllParticipantById?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListParticipant = response.data;
		$scope.nbParticipants = $scope.ListParticipant.length;
	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
	});*/
	/*console.log($stateParams.event)
	console.log($stateParams.event.Name)*/
}])

.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService) {
	$scope.connection = function(){
		$http({
			method: 'GET',
			url: 'http://NANTES-0156.sii.fr:4444/' + '/getPerson?id=' + document.getElementById("connction").value
		}).then(function successCallback(response) {
			ConnectedUserService.setConnectedUser(response.data.Person);
			ConnectedUserService.setConnected("true");
			console.log("Connecté en tant que: ");
			console.log(ConnectedUserService.getConnectedUser());
			$window.history.back();
			//$window.location.href = '/#/side-menu21/page1';
		}, function erroCallabck(response) {
			console.log("Il y a eu des erreurs!")
		});
	}

}])

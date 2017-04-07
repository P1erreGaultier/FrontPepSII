angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'CustomFactory', 'BlankService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, CustomFactory, BlankService) {
		console.log("coucou");
		BlankService.sendMessage();
		$http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'
		//url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.ListEvent = response.data;

		for(i=0; i<$scope.ListEvent.length; i++){
			$scope.ListEvent[i].Datestart = Date.parse($scope.ListEvent[i].Datestart);
		}

		$scope.passEvent = function (event){
			CustomFactory.saveEvent(event);
		}
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs sur l'accueil");
		console.log(response);
	});

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('carteCtrl', ['$scope', '$stateParams', '$http','$compile','CustomFactory','$window',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $compile,CustomFactory,$window) {

	$scope.addMarker = function (pos, texte, numero){
		var mark = new google.maps.Marker({position:pos});
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
		url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'
		//url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		$scope.ListEvent = response.data;

		var options = {timeout: 10000, enableHighAccuracy: true};
		var latLng = new google.maps.LatLng(47.2112216, -1.5570168);
		var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService($scope.map);

		google.maps.event.addListener($scope.map, 'click', function(evt) {
	    evt.stop();
			if (evt.placeId != null){
			service.getDetails({
				 placeId: evt.placeId
			 }, function(place, status) {
				 if (status === google.maps.places.PlacesServiceStatus.OK) {
					var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <p> <button type=\"button\" onclick=\'CustomFactory.saveEvent('+ JSON.stringify(event) +'); $window.location.href=\"/#/side-menu21/page13\";\'>Creer un évenement</button> </p>';
					var compilePlace = $compile(contentPlace)($scope);
					infowindow.setContent(contentPlace);
	      	infowindow.setPosition(evt.latLng);
	      	infowindow.open($scope.map);
				}
	   	});
	 	}
	});

		$scope.addMarker = function (place,marker){
			marker.addListener('click', function() {
				//var event =  $scope.hashTable[place.place_id];
				var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <p> ------------------------------------------------------------------------------------------------ </p>';
				var contentEvent= "";
				for (var key in $scope.hashTable[place.place_id]){
					event = $scope.hashTable[place.place_id][key];
					contentEvent = contentEvent + '<div style=\'display:inline-block;margin-bottom:10px;\'><img src=\''+place.icon+'\'style=\'display:inline;width:75px;height:75;\'><div ui-sref=\'menu.detailsEvent()\' style=\'display:inline-block\'><p><b>'+ event.Name +'</b></p> <p>'+ event.Description +'</p> <p>'+ 'Du ' + event.Datestart + ' au ' + event.Dateend +'</p> <button type=\'button\' onclick=\'CustomFactory.saveEvent('+ JSON.stringify(event) +'); $window.location.href=\"/#/side-menu21/page13\";\'>Voir l\'évenement</button></div></div>';
				}
				var content = contentPlace + contentEvent
				var compileEvent = $compile(content)($scope);
				infowindow.setContent(content);
				infowindow.open(map, this);
			});
		}

		$scope.hashTable = {};
		for ( $scope.i=0; $scope.i<$scope.ListEvent.length; $scope.i++){
			if ($scope.hashTable[$scope.ListEvent[$scope.i].Placeid] == null){
				$scope.hashTable[$scope.ListEvent[$scope.i].Placeid] = [];
			}
			$scope.hashTable[$scope.ListEvent[$scope.i].Placeid].push($scope.ListEvent[$scope.i]);
			service.getDetails({
				 placeId: $scope.ListEvent[$scope.i].Placeid
			 }, function(place, status) {
				 if (status === google.maps.places.PlacesServiceStatus.OK) {
					 var marker = new google.maps.Marker({
						 map: $scope.map,
						 position: place.geometry.location
					 });
					 $scope.addMarker(place,marker);
				 }
			 });

		}
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs dans la map!")
	});

}])

.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService) {
	function onSuccess(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		console.log(googleUser);
		console.log(googleUser.getBasicProfile());
	}
	function onFailure(error) {
		console.log(error);
	}

		gapi.signin2.render('my-signin2', {
			'redirect_uri': 'http://localhost:8100',
			'scope': 'openid',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': onSuccess,
			'onfailure': onFailure
		});
	/*$scope.login=function() {
		var client_id="929890661942-49n2pcequcmns19fe1omff72tqcips1v.apps.googleusercontent.com";
		$cordovaOauth.google(client_id, ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result){
			alert(JSON.stringify(result));
			console.log(result);
		}, function(error){
			alert('error');
		});
		var scope="openid";
		var redirect_uri="http://localhost:8100/";
		var response_type="token";
		var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
		"&response_type="+response_type;
		window.location.replace(url);

	};*/


	$scope.connection = function(){

		$http({
			method: 'GET',
			url: 'http://webapp8.nantes.sii.fr/' + '/getPerson?id=' + document.getElementById("connction").value
			//url: 'http://NANTES-0156.sii.fr:4444/' + '/getPerson?id=' + document.getElementById("connction").value
		}).then(function successCallback(response) {
			console.log(response);
			ConnectedUserService.setConnectedUser(response.data);
			ConnectedUserService.setConnected("true");
			console.log("Connecté en tant que: ");
			console.log(ConnectedUserService.getConnectedUser());
			$window.history.back();
			//$window.location.href = '/#/side-menu21/page1';
		}, function erroCallabck(response) {
			alert('impossible de récupérer cette personne');
			alert('status: ' + response.status + ' / statusText: ' + response.statusText);
			console.log("Il y a eu des erreurs!");
		});
	}

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
				url: 'http://webapp8.nantes.sii.fr/saveEvent',
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

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$window', '$http','CustomFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, CustomFactory) {

	$scope.getBase64Image = function(img) {
		var canvas = document.createElement("canvas");
	  canvas.width = img.width;
	  canvas.height = img.height;
	  var ctx = canvas.getContext("2d");
	  ctx.drawImage(img, 0, 0);
	  var dataURL = canvas.toDataURL("image/png");
	  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}



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
	$scope.sourceImgEvent = event.Image;
	$scope.descriptionEvent = event.Description;
	$scope.dateStartEvent = event.Datestart;

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/' + 'getCommentByEvent?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
		console.log(response);
	});

	$http({
		method: 'GET',
		url: 'http://webapp8.nantes.sii.fr/getAllParticipantById?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListParticipant = response.data;
		$scope.nbParticipants = $scope.ListParticipant.length;
	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
		console.log(response);
	});
	/*console.log($stateParams.event)
	console.log($stateParams.event.Name)*/
}])

.controller('evaluerEvenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuConnnectionCtrl', ['$scope', '$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory',
function ($scope, $stateParams, ConnectedUserService, $window, $state, $ionicHistory) {
		$scope.isConnected = ConnectedUserService.IsConnected();
		if (ConnectedUserService.getConnectedUser() != null){
			$scope.connected = ConnectedUserService.getConnectedUser().pseudo;
		}

		$scope.showNavMenu = function() {
			var div = document.getElementById("navMenu");
			if (div.style.display == 'none'){
				div.style.display = 'block';
			}else{
				div.style.display = 'none';
			}
		}

		$scope.logOut = function(){
			ConnectedUserService.setConnected("false");
			ConnectedUserService.setConnectedUser(null);
			$scope.isConnected = ConnectedUserService.IsConnected();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.accueil', {}, {location: 'replace', reload: true})
			//$location.path('/#/side-menu21/page1').replace();
			//$window.location.reload();
		}

}])

.controller('mesVenementsCtrl', ['$scope', '$stateParams', '$cordovaDatePicker',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaDatePicker) {

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

.controller('mainCtrl', ['$scope',
function($scope) {
	$scope.view={
		name: ''
	};
	$scope.modify = function(val){
		$scope.view={
			name: val
		};
	}
}])

.controller('profilCtrl', ['$scope', '$stateParams','ConnectedUserService','$http',
function ($scope, $stateParams, ConnectedUserService, $http) {
	var user = ConnectedUserService.getConnectedUser();
	$scope.personID = user.personID;
	$scope.pseudo = user.pseudo;
	$scope.lastName = user.lastName;
	$scope.firstName = user.firstName;
	$scope.job = user.job;
	$scope.canModifiy = "false";

	$scope.saveProfil = function(){
		var save = true;
		if (document.getElementById("pseudoInput").value.trim() == ""){
			document.getElementById("pseudo").innerText = "Votre pseudo ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("pseudo").innerText = "Pseudo: ";
		}
		if (document.getElementById("firstNameInput").value.trim() == ""){
			document.getElementById("firstName").innerText = "Votre prenom ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("firstName").innerText = "Prenom: ";
		}
		if (document.getElementById("lastNameInput").value.trim() == ""){
			document.getElementById("lastName").innerText = "Votre nom ne peut pas être vide: ";
			save = false;
		}else{
			document.getElementById("lastName").innerText = "Nom: ";
		}
		if (save){

			$http({
				method: 'POST',
				url : 'http://webapp8.nantes.sii.fr/addPerson',
				//url: 'http://NANTES-0156.sii.fr:4444/addPerson',
				data: {
					personID: $scope.personID,
					pseudo: document.getElementById("pseudoInput").value,
					lastName: document.getElementById("lastNameInput").value,
					firstName: document.getElementById("firstNameInput").value,
					job: document.getElementById("jobInput").value
				}
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(user.personID);
				console.log(response);
				var userResponse = response.data;
				$scope.personID = userResponse.personID;
				$scope.pseudo = userResponse.pseudo;
				$scope.lastName = userResponse.lastName;
				$scope.firstName = userResponse.firstName;
				$scope.job = userResponse.job;
				ConnectedUserService.setConnectedUser(userResponse);
				$scope.canModifiy = "false";
				alert("Modification enregistrées");
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
			});
		}
	}

	$scope.modify = function(){
		$scope.canModifiy = "true";
	}

	$scope.modifyBack = function(){
		$scope.canModifiy = "false";
	}

}])

.controller('rechercheCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('suggestionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, ConnectedUserService) {

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

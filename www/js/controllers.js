angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'EventService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, EventService) {
		$http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'
		//url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.ListEvent = response.data;
		EventService.saveEvents($scope.ListEvent);
		for(i=0; i<$scope.ListEvent.length; i++){
			$scope.ListEvent[i].DateStart = Date.parse($scope.ListEvent[i].DateStart);
		}
		$scope.passEvent = function (event){
			EventService.saveEvent(event);
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

.controller('carteCtrl', ['$scope', '$stateParams', '$http','$compile','EventService','$window','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $compile, EventService, $window, $filter) {

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

		$scope.ListEvent = EventService.getEvents();
		console.log($scope.ListEvent);
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

		//var contentPlace = "<button type=\"button\" ui-sref=\"menu.inscription\">Creer un évenement</button>";


		google.maps.event.addListener($scope.map, 'click', function(evt) {
	    evt.stop();
			if (evt.placeId != null){
			service.getDetails({
				 placeId: evt.placeId
			 }, function(place, status) {
				 if (status === google.maps.places.PlacesServiceStatus.OK) {
					var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <a href=\"/#/side-menu21/page8\">Creer un évenement</a>';
					infowindow.setContent(contentPlace);
	      	infowindow.setPosition(evt.latLng);
	      	infowindow.open($scope.map);
				}
	   	});
	 	}
	});

		$scope.addMarker = function (place,marker){
			marker.addListener('click', function() {
				console.log(place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));
				var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <p> ------------------------------------------------------------------------------------------------ </p>';
				var contentEvent= "";
				for (i = 0; i<$scope.ListEvent.length; i++){
					event = $scope.ListEvent[i];
					if (place.place_id == event.PlaceId){
					contentEvent = contentEvent + '<div style=\'display:inline-block;margin-bottom:10px;\'><img src=\''+place.icon+'\'style=\'display:inline;width:75px;height:75;\'><div ui-sref=\'menu.detailsEvent()\' style=\'display:inline-block\'><p><b>'+ event.Name +'</b></p> <p>'+ event.Description +'</p> <p>'+ 'Du ' + $filter('date')(event.DateStart, "dd/MM/yyyy HH:mm") + ' au ' + event.DateEnd +'</p> <a href=\"/#/side-menu21/page10\">Voir l\'évenement</a></div></div>';
				}
				}
				var content = contentPlace + contentEvent
				var compileEvent = $compile(content)($scope);
				infowindow.setContent(content);
				infowindow.open(map, this);
			});
		}

		$scope.hashTable = {};
		for ( $scope.i=0; $scope.i<$scope.ListEvent.length; $scope.i++){
			/*if ($scope.hashTable[$scope.ListEvent[$scope.i].Placeid] == null){
				$scope.hashTable[$scope.ListEvent[$scope.i].Placeid] = [];
			}
			$scope.hashTable[$scope.ListEvent[$scope.i].Placeid].push($scope.ListEvent[$scope.i]);*/
			service.getDetails({
				 placeId: $scope.ListEvent[$scope.i].PlaceId
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

}])

.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService, $state) {
	var id = "hrjkeghrhgkd";

	$scope.googlePlus = function() {
		window.plugins.googleplus.login(
		{'webClientId': '784894623300-gmkq3hut99f16n220kjimotv0os7vt2e.apps.googleusercontent.com',},
		function (responseGoogle) {
			$http({
				method: 'POST',
				url: 'http://webapp8.nantes.sii.fr/connect',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
				},
				data: {tokenid: responseGoogle.idToken}
			}).then(function successCallback(response) {
				alert(JSON.stringify(response));
				if (response.data == null){
					ConnectedUserService.setResponseGoogle(responseGoogle);
					$state.go('menu.inscription');
				}else{
					ConnectedUserService.setConnectedUser(response.data);
					ConnectedUserService.setResponseGoogle(responseGoogle);
					ConnectedUserService.setConnected("true");
					$window.history.back();
				}
			}, function erroCallabck(response) {
				alert("Erreur");
				alert(JSON.stringify(response));
			});
		},
		function (error) {
			alert("erreur: " + error);
		});
	}

	$scope.googlePlusLogOut = function() {
		window.plugins.googleplus.logout();
	}

	/*function onSuccess(googleUser) {
.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService','GoogleService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService,GoogleService) {
	var id = "";
	function onSuccess(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		console.log(googleUser);
		console.log(googleUser.getBasicProfile());
		id = googleUser.getAuthResponse().id_token;
		ConnectedUserService.setGoogleId(id);
		GoogleService.saveGU(googleUser);
		/*$http({
			method: 'POST',
			url: 'http://10.10.1.155/testToken',
			data: googleUser.getAuthResponse().id_token

		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
		});*/
	/*}
	function onFailure(error) {
		console.log(error);
	}

		gapi.signin2.render('my-signin2', {
			'redirect_uri': 'http://localhost/callback',
			'scope': 'openid',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': onSuccess,
			'onfailure': onFailure
		});*/

		$scope.signOut = function() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
			});
		}

			$scope.testConnect = function(){
				$state.go('menu.inscription');
				/*$http({
					method: 'POST',
					url: 'http://webapp8.nantes.sii.fr/connect',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
					//data: {tokenid: id, person: "{\"personID\":1,\"pseudo\":\"Pierre le stagiaire\",\"lastName\":\"Gaultier\",\"firstName\":\"Pierre\",\"job\":\"Stagiaire\",\"personEmail\":\"p.g@gmail.com\"}"}
					data: {tokenid: id}

					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
					},
					data: {tokenid: id}
				}).then(function successCallback(response) {
					console.log("message send");
					console.log(response);
				}, function erroCallabck(response) {
					console.log(response);
					console.log("Envoi token: Il y a eu des erreurs!");
				});*/
			}


	$scope.connection = function(){

		$http({
			method: 'GET',
			url: 'http://webapp8.nantes.sii.fr/' + '/getPersonById?id=' + document.getElementById("connection").value
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

.controller('crErUnVenementCtrl', ['$scope', '$stateParams','$window', '$cordovaDatePicker', '$http','EventService','ConnectedUserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $cordovaDatePicker, $http, EventService, ConnectedUserService) {
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
			/*
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
				EventService.saveEvent(response.data.Event);
				$window.location.href = '/#/side-menu21/page13';
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
			});
			*/

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
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi token: Il y a eu des erreurs!");
				alert(JSON.stringify(response));
			});
		}

	}

}])

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

.controller('evaluerEvenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuConnnectionCtrl', ['$scope', '$stateParams', 'ConnectedUserService', '$window', '$state', '$ionicHistory',
function ($scope, $stateParams, ConnectedUserService, $window, $state, $ionicHistory) {
		$scope.isConnected = ConnectedUserService.isConnected();
		if (ConnectedUserService.getConnectedUser() != null){
			$scope.connected = ConnectedUserService.getConnectedUser().Pseudo;
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
			window.plugins.googleplus.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.accueil', {}, {location: 'replace', reload: true})
			//$location.path('/#/side-menu21/page1').replace();
			//$window.location.reload();
		}

}])

.controller('mesVenementsCtrl', ['$scope', '$stateParams', '$cordovaDatePicker', 'ConnectedUserService', '$location', '$state', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaDatePicker, ConnectedUserService, $location, $state, $ionicHistory) {

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
	$scope.personID = user.PersonID;
	$scope.pseudo = user.Pseudo;
	$scope.lastName = user.LastName;
	$scope.firstName = user.FirstName;
	$scope.job = user.Job;
	$scope.canModifiy = "false";
	console.log(ConnectedUserService.getConnectedUser());

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
				url : 'http://webapp8.nantes.sii.fr/registerPerson?id=' + ConnectedUserService.getGoogleId(),
				//url: 'http://NANTES-0156.sii.fr:4444/addPerson',
				data: {
					personID: $scope.personID,
					pseudo: document.getElementById("pseudoInput").value,
					lastName: document.getElementById("lastNameInput").value,
					firstName: document.getElementById("firstNameInput").value,
					job: document.getElementById("jobInput").value,
					personEmail: ConnectedUserService.getConnectedUser().personEmail
				},
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(user.personID);
				console.log(response);
				var userResponse = response.data;
				$scope.personID = userResponse.PersonID;
				$scope.pseudo = userResponse.Pseudo;
				$scope.lastName = userResponse.LastName;
				$scope.firstName = userResponse.FirstName;
				$scope.job = userResponse.Job;
				ConnectedUserService.setConnectedUser(userResponse);
				$scope.canModifiy = "false";
				alert("Modification enregistrées");
				alert(JSON.stringify(response));
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
				alert(JSON.stringify(response));
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

.controller('suggestionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', '$filter', '$ionicHistory', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, ConnectedUserService, $filter, $ionicHistory, $state) {
$scope.suggestion= function(){
	var date = $filter('date')(new Date(), 'dd/MM/yyyy')
	var responseGoogle = ConnectedUserService.getResponseGoogle();
	alert(JSON.stringify(responseGoogle));
	alert(responseGoogle.idToken);
	var suggestionToSend = {
		"Text" : document.getElementById("text").value,
		"Job" : ConnectedUserService.getConnectedUser().Job,
		"Date" : date
	};

	$http({
		method: 'POST',
		url: 'http://webapp8.nantes.sii.fr/saveSuggestion',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
			var str = [];
			for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		},
		data: {tokenid:responseGoogle.idToken, suggestion: JSON.stringify(suggestionToSend)}
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
}])

.controller('menuCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $state, ConnectedUserService) {
	$scope.checkUser = function() {
		console.log("checkUser");
		if (ConnectedUserService.isConnected() != "true"){
			//$state.go('menu.connection', {}, {location: 'replace', reload: true})
			/*$location.path('/#/side-menu21/page14');
			$window.location.reload();*/
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.connection', {}, {location: 'replace', reload: true});
		}else {
			$state.go('menu.mesVenements', {}, {location: 'replace', reload: true});
		}
	}
}])

.controller('inscriptionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,ConnectedUserService) {
alert(JSON.stringify(ConnectedUserService.getResponseGoogle()));
$scope.inscription= function(){
		var responseGoogle = ConnectedUserService.getResponseGoogle();
		var personToSend = {
			"Pseudo" : document.getElementById("pseudo").value,
			"LastName" : responseGoogle.familyName,
			"FirstName" : responseGoogle.givenName,
			"Job" : document.getElementById("job").value,
			"PersonEmail" : responseGoogle.email
		};
		alert(JSON.stringify(personToSend));
		$http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/registerPerson',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid: responseGoogle.idToken, person: JSON.stringify(personToSend)}
		}).then(function successCallback(response) {
			console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
		}, function erroCallabck(response) {
			console.log(response);
			console.log("Envoi token: Il y a eu des erreurs!");
			alert(JSON.stringify(response));
		});
}

}])

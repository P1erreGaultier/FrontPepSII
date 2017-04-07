angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

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

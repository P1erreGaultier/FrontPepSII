angular.module('app.controllers')

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

		google.maps.event.addListener($scope.map, 'click', function(evt) {
	    evt.stop();
			if (evt.placeId != null){
			service.getDetails({
				 placeId: evt.placeId
			 }, function(place, status) {
				 if (status === google.maps.places.PlacesServiceStatus.OK) {
					console.log(place.place_id);
					var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <a href=\"/#/side-menu21/page8?id='+ place.place_id +'\">Creer un évenement</a>';
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

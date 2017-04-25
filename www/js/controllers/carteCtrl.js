angular.module('app.controllers')

.controller('carteCtrl', ['$stateParams','$compile','eventService','$window','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams , $compile, eventService, $window, $filter) {

	var vm = this;
	vm.listEvent = [];
	vm.getAllEvent = getAllEvent;
	vm.addMarker = addMarker;

	activate();

	function activate() {
		getAllEvent();
	}

	function getAllEvent() {
		return eventService.getAllEvent()
			.then(function(data) {
				vm.listEvent = data;
				for (vm.i=0; vm.i<vm.listEvent.length; vm.i++){
					service.getDetails({
						 placeId: vm.listEvent[vm.i].PlaceId
					 }, function(place, status) {
						 if (status === google.maps.places.PlacesServiceStatus.OK) {
							 var marker = new google.maps.Marker({
								 map: vm.map,
								 position: place.geometry.location
							 });
							 vm.addMarker(place,marker);
						 }
					 });
				}
			});
	}

	function addMarker (place,marker){
	 marker.addListener('click', function() {
		 console.log(place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));
		 var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) +'\" alt="photo place"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <p> ------------------------------------------------------------------------------------------------ </p>';
		 var contentEvent= "";
		 for (i = 0; i<vm.listEvent.length; i++){
			 ev = vm.listEvent[i];
			 if (place.place_id == ev.PlaceId){
			 contentEvent = contentEvent + '<div style=\'display:inline-block;margin-bottom:10px;\'><img src=\''+place.icon+'\'style=\'display:inline;width:75px;height:75;\'><div ui-sref=\'menu.detailsEvent()\' style=\'display:inline-block\'><p><b>'+ ev.Name +'</b></p> <p>'+ ev.Description +'</p> <p>'+ 'Du ' + $filter('date')(ev.DateStart, "dd/MM/yyyy HH:mm") + ' au ' + ev.DateEnd +'</p> <a href=\"/#/side-menu21/page10\">Voir l\'évenement</a></div></div>';
		 }
		 }
		 var content = contentPlace + contentEvent;
		 infowindow.setContent(content);
		 infowindow.open(map, this);
	 });
 }

		var options = {timeout: 10000, enableHighAccuracy: true};
		var latLng = new google.maps.LatLng(47.2112216, -1.5570168);
		var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(vm.map);

		google.maps.event.addListener(vm.map, 'click', function(evt) {
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
	      	infowindow.open(vm.map);
				}
	   	});
	 	}
	});
}])

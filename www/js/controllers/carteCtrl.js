angular.module('app.controllers')

.controller('carteCtrl', ['$stateParams','$state','$compile','eventService','$window','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams ,$state, $compile, eventService, $window, $filter) {

	var vm = this;
	vm.listEvent = [];
	vm.getEvents = getEvents;
	vm.addMarker = addMarker;
	vm.redirectEvent = redirectEvent;
	vm.redirectCreate = redirectCreate;
	vm.eventToSend;
	vm.pid = "tid";
	vm.pname = "tname";

	activate();

	function activate() {
		getEvents();
	}

	function redirectCreate() {
		eventService.saveEventId(vm.pid);
		eventService.saveEventName(vm.pname);
		$state.go('menu.crErUnVenement', {}, {location: 'replace', reload: false})
	}

	function redirectEvent() {
		eventService.saveEvent(vm.listEvent[document.getElementById('eventToSend').value]);
		$state.go('menu.detailsEvent', {}, {location: 'replace', reload: false})
	}

	function getEvents() {
		return eventService.getUpcommingEvents(40)
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
		 var bootstrap = '<link rel="stylesheet" type="text/css" href="lib/bootstrap.min.css"><link rel="stylesheet" href="lib/bootstrap-theme.min.css" >'
		 var contentPlace = '<div style=\"display:inline-block;\"><img src=\"'+ place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 200}) +'\" class ="img-thumbnail" alt="photo place"><h4>'+ place.name + '</h4><p>'+ place.formatted_address +'</p><p><a href="'+ place.website +'">Voir le site</a></p> </div>';
		 var contentEvent= "<h3>Evenements</h3><ul class=\"list-group\">";
		 for (i = 0; i<vm.listEvent.length; i++){
			 ev = vm.listEvent[i];
			 if (place.place_id == ev.PlaceId){
			 document.getElementById("eventToSend").value = i;
			 var ribbonColor = "";
			 if (ev.EventType.Type == "AfterWork"){
				 ribbonColor = "ribbonRed";
			 } else if (ev.EventType.Type == "Sport") {
				 ribbonColor = "ribbonBlue";
			 } else {
				 ribbonColor = "ribbonGreen";
			 }
			 contentEvent = contentEvent + '<li class=\"list-group-item ribbon '+ribbonColor+'\"><span>'+ev.EventType.Type+'</span><div style=\'display:inline-block;margin-bottom:10px;\'><img src="\img/event'+ev.Image+'.jpg"\'style=\'display:inline;width:75px;height:75;\' class ="img-thumbnail"><div style=\'display:inline-block\'><h4>'+ ev.Name +'</h4> <p>'+ ev.Description.substring(0,30)+'... ' +'</p> <p>'+ 'Du ' + $filter('date')(ev.DateStart, "dd/MM/yyyy HH:mm") + ' au ' + ev.DateEnd;
			 contentEvent = contentEvent +"<br/> <br/> <button class='btn btn-primary' onclick=\"document.getElementById('eventToSend').value = "+ i + ";document.getElementById('detailsEvent').click();\"> Voir l\'évenement </button> </p></div></div></li>";
		 }
		 }
		 contentEvent = contentEvent + "</ul>";
		 var content = bootstrap + contentPlace + contentEvent;
		 infowindow.setContent(content);
		 infowindow.open(map, this);
	 });
 }

		var options = {timeout: 10000, enableHighAccuracy: true};
		var latLng = new google.maps.LatLng(47.2112216, -1.5570168); // Nantes
		var mapOptions = {
				center: latLng,
				zoom: 12,
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
					vm.pid = place.place_id;
					vm.pname = place.name;
					console.log(place.name);
					var bootstrap = '<link rel="stylesheet" type="text/css" href="lib/bootstrap.min.css"><link rel="stylesheet" href="lib/bootstrap-theme.min.css" >'
					var contentPhoto = '<div style=\"display:inline-block\"><img class ="img-thumbnail" src=\"'+ place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 200}) +'\" alt="photo place"></div></br> <div style=\"display:inline-block\">';
					var contentPlace = '<h4>'+ place.name + '</h4><p>'+ place.formatted_address +'</p><p>  <a type="button" class="btn btn-link" href="'+ place.website +'">Voir le site</a></p>' ;
					var contentButton= "<p> <button class='btn btn-primary' onclick=\"document.getElementById('create').click();\"> Creer un évenement ici </button> </p></div>";
					infowindow.setContent(bootstrap + contentPhoto + contentPlace + contentButton);
	      	infowindow.setPosition(evt.latLng);
	      	infowindow.open(vm.map);
				}
	   	});
	 	}
	});
}])

angular.module('app.controllers')

.controller('crErUnVenementCtrl', ['$stateParams','$window', '$cordovaDatePicker', '$http','eventService', '$ionicHistory', '$state', 'personService', '$ionicPopup', '$scope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $cordovaDatePicker, $http, eventService, $ionicHistory, $state, personService, $ionicPopup, $scope) {
	var vm = this;

	vm.minDate;
	vm.eventTypes;
	vm.imageList = [];
	vm.selectedImage;
	vm.getAllEventType = getAllEventType;
	vm.saveEvent = saveEvent;
	vm.selectPlaceId = selectPlaceId;
	vm.openPopupSelectImage= openPopupSelectImage;
	vm.selectImage = selectImage;

	activate();

	function activate() {
		vm.minDate = new Date().toDateString();
		getAllEventType();
		vm.placeid = eventService.getEventId();
		vm.placename = eventService.getEventName();
		for(i=0;i<9;i++){
			if(i==5){
				vm.imageList[i] = {name:"event"+(i+1)+".jpg", id:i +1, feature:"987.mp3"};
			} else if (i >5) {
				vm.imageList[i] = {name:"event"+(i+1)+".jpg", id:i +1, feature:"986.mp3"};
			} else {
				vm.imageList[i] = {name:"event"+(i+1)+".jpg", id:i +1};
			}
		}
		vm.selectedImage = {name:"event1.jpg", id:1}
	}

	function getAllEventType() {
		return eventService.getAllEventType()
			.then(function(data) {
				vm.eventTypes = data;
				return vm.eventTypes;
			});
	}

	function selectPlaceId() {
		$state.go('menu.carte', {}, {location: 'replace', reload: false})
	}

	function saveEvent() {
		vm.send = true;
		if(document.getElementById("selectedDate").value == ""){
			vm.erreurDate = ": Date invalide";
			vm.send= false;
		}else{
			vm.erreurDate = "";
		}
		if(document.getElementById("horaireDebut").value == ""){
			vm.erreurHoraireDebut = ": Heure invalide";
			vm.send = false;
		}else{
			vm.erreurHoraireDebut = "";
		}
		if(document.getElementById("horaireFin").value == ""){
			vm.erreurHoraireFin = ": Heure invalide";
			vm.send = false;
		}else{
			vm.erreurHoraireFin = "";
		}
		if(document.getElementById("lieu").value == ""){
			vm.erreurLieu = ": Lieu invalide";
			vm.send = false;
		}else {
			vm.erreurLieu = "";
		}

		if (vm.send){
			var type = vm.eventTypes[document.getElementById("type").value - 1];
			var eventToSend = {
				"EventTypeId": type.EventTypeId,
				"Type": type.Type
			}
			var ownerToSend = personService.getConnectedUser();
			var responseGoogle = personService.getResponseGoogle();
			var eventToSend = {
				"Name" : document.getElementById("nomEvenement").value,
				"DateStart" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
				"DateEnd" : document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
				"PlaceId" : document.getElementById("lieu").value,
				"Description": document.getElementById("description").value,
				"Image" : document.getElementById("image").value,
				"IsCanceled" : 0,
				"Owner" : ownerToSend,
				"EventType" : eventToSend
			};
			alert(JSON.stringify(eventToSend));
			eventService.registerEvent(responseGoogle.idToken,eventToSend)
			.then(function(data){

				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('menu.accueil', {}, {location: 'replace', reload: true})

			});
		}
	}

	function openPopupSelectImage() {

		var myPopup = $ionicPopup.show({
				 template: '<img src="img/{{vm.selectedImage.name}}"><div style="overflow-x:scroll;white-space:nowrap;" scrollbar-y-auto><img ng-repeat="image in vm.imageList" style="width:50px;heigth:50px;" src="img/{{image.name}}" ng-click="vm.selectImage({{image}})"></div>',
				 title: 'Images',
				 subTitle: 'Choisissez votre image.',
				 scope: $scope,

				 buttons: [
					 {
							 text: '<b>Ok</b>',
							 type: 'button-positive'
						}
				 ]
			});

			myPopup.then(function(res) {
				if (res){
					console.log(res);
				}

			});
	}

	function selectImage(image) {
		vm.selectedImage = image;
		if(image.feature != undefined){
			var audio = new Audio('img/' + image.feature);
			audio.play();
		}
	}

}])

angular.module('app.controllers')

.controller('accueilCtrl', ['eventService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (eventService) {
	var vm = this;
	vm.listEvent = [];
	vm.getAllEvent = getAllEvent;
	vm.passEvent = passEvent;
	vm.changeColor = changeColor;
	vm.formatDate = formatDate;
	vm.formatDescription = formatDescription;
	vm.getRibbon = getRibbon;
	activate();

	function activate() {
		getAllEvent();
	}

	function getAllEvent() {
		return eventService.getAllEvent()
			.then(function(data) {
				vm.listEvent = data;
				return vm.listEvent;
			});
	}

	function passEvent(eventToSend){
		return eventService.saveEvent(eventToSend);
	}

	function changeColor() {
		console.log("coucou");
		document.getElementById("oui").style.background = "#EC008C";
		document.getElementById("oui").style.backgroundBlendMode = "screen";
		document.getElementById("oui").style.content = "";
	}

	function formatDate(date){
    var dateOut = new Date(date);
    return dateOut;
  }

	function formatDescription(description) {
		var descriptionOut = "";
		if (description.length > 49) {
			descriptionOut = description.substring(0, 50) + "...";
		} else {
			descriptionOut = description;
		}
		return descriptionOut;
	}

	function getRibbon(type) {
		if (type == "AfterWork"){
			return "ribbonRed";
		} else if (type == "Sport") {
			return "ribbonBlue";
		} else {
			return "ribbonGreen";
		}
	}

}])

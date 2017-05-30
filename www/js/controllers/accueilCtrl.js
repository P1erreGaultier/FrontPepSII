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
	vm.getRibbon = getRibbon;
	activate();

	function activate() {
		getAllEvent();

		/*document.onkeydown = function(evt) {
    evt = evt || window.event;
		document.getElementById("mainItem").style.backgroundImage = "url(img/event6.jpg)";
    if (evt.keyCode == 72) {
			var audio = new Audio('img/987.mp3');
			audio.play();
    }
	};*/

	}

	function getAllEvent() {
		return eventService.getUpcommingEvents(10)
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

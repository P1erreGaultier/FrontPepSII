angular.module('app.controllers')

.controller('accueilCtrl', ['eventService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (eventService) {
	var vm = this;
	vm.listEvent = [];
	vm.getAllEvent = getAllEvent;
	vm.passEvent = passEvent;

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


}])

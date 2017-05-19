angular.module('app.controllers')

.controller('rechercheCtrl', ['eventService', 'searchService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (eventService, searchService) {

  var vm = this;
  vm.listTypes = [];
  vm.types = [];
  vm.listEvents = [];
  vm.loading = false;
  vm.listEventsToDisplay = [];
  vm.getEventTypes = getEventTypes;
  vm.showAllEvents = showAllEvents;
  vm.filterEvents = filterEvents;
  vm.passEvent = passEvent;
  vm.submit = submit;
  vm.getRibbon = getRibbon;
  vm.formatDate = formatDate;

  activate();

  function activate() {
    getEventTypes();
  }

  function getEventTypes() {
    return eventService.getAllEventType()
      .then(function(data){
        vm.listTypes = data;
        for(i=0;i<vm.listTypes.length;i++){
          vm.types[vm.listTypes[i].EventTypeId] = true;
        }
      })
  }

  function showAllEvents() {
    return eventService.getAllEvent()
    .then(function(response){
      vm.listEvents = response;
      filterEvents();
      document.getElementById("noResultFound").style.display = "none";
    })
  }

  function filterEvents() {
    vm.listEventsToDisplay = vm.listEvents;
    for (i=0;i<vm.listTypes.length;i++){
      if (!vm.types[vm.listTypes[i].EventTypeId]){
        vm.listEventsToDisplay = vm.listEventsToDisplay.filter(removeType(vm.listTypes[i].Type));
      }
    }
  }

  function removeType(typeToRemove){
    return function(eventsToFilter){
      return eventsToFilter.EventType.Type != typeToRemove;
    }
  }

  function passEvent(eventToSend){
    return eventService.saveEvent(eventToSend);
  }

  function submit($event) {
    document.getElementById("noResultFound").style.display = "none";
    vm.listEventsToDisplay = [];
    if ($event.keyCode == 13) {
      vm.loading = true;
      searchService.searchEvent(document.getElementById("search").value)
      .then(function(response){
        vm.listEvents = response;
        if (vm.listEvents.length == 0) {
          document.getElementById("noResultFound").style.display = "block";
        }
        filterEvents();
        vm.loading = false
        console.log(vm.listEvents);
        console.log(vm.listEventsToDisplay);
      }).catch(function(error){
        console.log(error);
      })

      document.getElementById("search").blur();
    }
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

  function formatDate(date){
    var dateOut = new Date(date);
    return dateOut;
  }

}])

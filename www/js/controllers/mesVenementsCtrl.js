angular.module('app.controllers')

.controller('mesVenementsCtrl', ['$stateParams', 'eventService', 'personService','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, eventService, personService, $filter) {
  var vm = this;
  var selectedDiv = "next";
  vm.listMyEvents = [];
  vm.listToDisplay = [];
  vm.listPastEvents = [];
  vm.listNextEvents = [];
  vm.getMyEvents = getMyEvents;
  vm.select = select;
  vm.passEvent = passEvent;
  vm.myEventCheck = myEventCheck;
  vm.owner = "";
  vm.formatDate = formatDate;
  vm.getRibbon = getRibbon;

  activate();

  function activate() {
    getMyEvents();
  }

  function getMyEvents() {
    return eventService.getMyEvents(personService.getConnectedUser().PersonId)
    //return event.getMyEvents(personService.getConnectedUser().PersonId)
      .then(function(data) {

        vm.listMyEvents = data;

        vm.listPastEvents = vm.listMyEvents.filter(checkDateInf);
        vm.listNextEvents = vm.listMyEvents.filter(checkDateSup);
        vm.listToDisplay = vm.listNextEvents;
        vm.owner = personService.getConnectedUser().PersonId;
      });
  }

  function select(div) {
    document.getElementById(div).style.height = "50px";
    if (div == "nextEvents"){
      vm.listToDisplay = vm.listNextEvents;
      selectedDiv = "next";
      document.getElementById("pastEvents").style.height = "38px";
    } else {
      vm.listToDisplay = vm.listPastEvents;
      selectedDiv = "past";
      document.getElementById("nextEvents").style.height = "38px";
    }
  }

  function myEventCheck() {
    if (document.getElementById("checkboxMyEvent").checked){
      vm.listNextEvents = vm.listNextEvents.filter(checkIsMyEvent);
      vm.listPastEvents = vm.listPastEvents.filter(checkIsMyEvent);
      vm.listToDisplay = vm.listToDisplay.filter(checkIsMyEvent);
    } else {
      vm.listPastEvents = vm.listMyEvents.filter(checkDateInf);
      vm.listNextEvents = vm.listMyEvents.filter(checkDateSup);
      if (selectedDiv == "next") {
        vm.listToDisplay = vm.listNextEvents;
      } else {
        vm.listToDisplay = vm.listPastEvents;
      }
    }
  }

  function checkDateSup(eventToFilter) {
    return eventToFilter.DateStart >= $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
  }

  function checkDateInf(eventToFilter) {
    return eventToFilter.DateStart < $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
  }

  function checkIsMyEvent(eventToFilter){
    return eventToFilter.Owner.PersonId == personService.getConnectedUser().PersonId;
  }


  function passEvent(eventToSend){
    return eventService.saveEvent(eventToSend);
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

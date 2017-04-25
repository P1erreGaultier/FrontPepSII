angular.module('app.controllers')

.controller('mesVenementsCtrl', ['$stateParams', 'eventService', 'ConnectedUserService','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, eventService, ConnectedUserService, $filter) {
  var vm = this;
  vm.listMyEvents = [];
  vm.listPastEvents = [];
  vm.listNextEvents = [];
  vm.getMyEvents = getMyEvents;
  vm.select = select;
  vm.passEvent = passEvent;

  activate();
  console.log("coucou");

  function activate() {
    getMyEvents();
  }

  function getMyEvents() {
    return eventService.getMyEvents(ConnectedUserService.getConnectedUser().PersonId)
    //return event.getMyEvents(ConnectedUserService.getConnectedUser().PersonId)
      .then(function(data) {
        console.log(data);

        function checkDateSup(eventToFilter) {
          return eventToFilter.DateStart >= $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
        }

        function checkDateInf(eventToFilter) {
          return eventToFilter.DateStart < $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
        }

        vm.listNextEvents = data.filter(checkDateSup);
        vm.listPastEvents = data.filter(checkDateInf);

        vm.listMyEvents = vm.listNextEvents;
      });
  }

  function select(div) {
    document.getElementById(div).style.height = "50px";
    if (div == "nextEvents"){
      vm.listMyEvents = vm.listNextEvents;
      document.getElementById("pastEvents").style.height = "38px";
    } else {
      vm.listMyEvents = vm.listPastEvents;
      document.getElementById("nextEvents").style.height = "38px";
    }
  }

  function passEvent(eventToSend){
    return eventService.saveEvent(eventToSend);
  }

}])

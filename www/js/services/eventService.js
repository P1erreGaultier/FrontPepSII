angular.module('app.services')
.factory('event', event)

event.$inject = ['$http'];

function event($http) {
  var event;

  return {
    getAllEvent: getAllEvent,
    saveEvent: saveEvent,
    getEvent: getEvent
  };

  function getAllEvent(){
    return $http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'})
      .then(getAllEventComplete)
      .catch(getAllEventFailed);

    function getAllEventComplete(response) {
      /*for(i=0; i<$scope.ListEvent.length; i++){
        $scope.ListEvent[i].DateStart = Date.parse($scope.ListEvent[i].DateStart);
      }*/
      return response.data;
    }
    function getAllEventFailed(response){
      console.log("Il y a eu des erreurs sur l'accueil");
      console.log(response);
    }
  };

  function saveEvent(eventToSave){
    event = eventToSave;
  };

  function getEvent() {
    return event;
  }
}

angular.module('app.services')
.factory('event', event)

event.$inject = ['$http'];

function event($http) {
  var event;

  return {
    getAllEvent: getAllEvent,
    saveEvent: saveEvent,
    getEvent: getEvent,
    registerEvent: registerEvent
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

  function registerEvent(idToken, eventToSend ){
    return $http({
      method: 'POST',
      url: 'http://webapp8.nantes.sii.fr/saveEvent',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: {tokenid: idToken, event: JSON.stringify(eventToSend)}
    })
      .then(getAllEventComplete)
      .catch(getAllEventFailed);

    function registerEventComplete(response) {
      console.log("message send");
      console.log(response);
      alert(JSON.stringify(response));
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('menu.accueil', {}, {location: 'replace', reload: true})
      return response;
    }
    function registerEventFailed(response){
      console.log(response);
      console.log("Envoi token: Il y a eu des erreurs!");
      alert(JSON.stringify(response));
      return response;
    }
  };

}

angular.module('app.services')
.factory('eventService', eventService)

eventService.$inject = ['$http', '$state', '$ionicHistory'];

function eventService($http, $state, $ionicHistory) {
  var event;
  var eventId;
  var eventName;

  return {
    getAllEvent: getAllEvent,
    getUpcommingEvents: getUpcommingEvents,
    getMyEvents: getMyEvents,
    getAllEventType: getAllEventType,
    saveEvent: saveEvent,
    getEvent: getEvent,
    registerEvent: registerEvent,
    saveEventId : saveEventId,
    getEventId : getEventId,
    saveEventName : saveEventName,
    getEventName : getEventName
  };

  function getAllEvent(){
    return $http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'})
      .then(getAllEventComplete)
      .catch(getAllEventFailed);

    function getAllEventComplete(response) {
      return response.data;
    }
    function getAllEventFailed(response){
      console.log("Error: getAllEvent");
      console.log(response);
    }
  };

  function getUpcommingEvents(nbEvents) {
    return $http({
      method:'GET',
      url: 'http://webapp8.nantes.sii.fr/getUpcommingEvents?id=' + nbEvents})
      .then(getUpcommingEventsComplete)
      .catch(getUpcommingEventsFailed);

      function getUpcommingEventsComplete(response) {
        return response.data;
      }
      function getUpcommingEventsFailed(response) {
        console.log("Error: getUpcommingEvents");
        console.log(response);
      }
    }

  function getMyEvents(idPerson) {
    return $http({
    method: 'GET',
    url: 'http://webapp8.nantes.sii.fr/' + 'getEventsByPerson?id=' + idPerson})
      .then(getMyEventsComplete)
      .catch(getMyEventsFailed);

    function getMyEventsComplete(response) {
      return response.data;
    }
    function getMyEventsFailed(response){
      console.log("Error: getMyEvents");
      console.log(response);
    }
  };

  function getAllEventType(){
    return $http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEventType'})
      .then(getAllEventTypeComplete)
      .catch(getAllEventTypeFailed);

    function getAllEventTypeComplete(response) {
      return response.data;
    }
    function getAllEventTypeFailed(response){
      console.log("Error: getAllEventType");
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
    alert("dans registerEvent");
    return "coucou";
    /*return $http({
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
      .then(registerEventComplete)
      .catch(registerEventFailed);

    function registerEventComplete(response) {
      console.log("message send");
      console.log(response);
    }
    function registerEventFailed(response){
      console.log(response);
      console.log("Envoi token: Il y a eu des erreurs!");
      return response;
    }*/
  };


  function saveEventId( id) {
    eventId = id;
  }

  function getEventId() {
    return eventId;
  }

  function saveEventName(name) {
    eventName = name;
  }

  function getEventName() {
    return eventName;
  }

}

angular.module('app.services')
.factory('participantService', participantService)

suggestion.$inject = ['$http','$window', '$ionicHistory', '$state'];

function participantService($http, $window, $ionicHistory, $state) {

return {
  saveParticipant : saveParticipant,
  cancelParticipation : cancelParticipation,
  getAllParticipantById : getAllParticipantById
};

function getAllParticipantById(eventId){
  return $http({
  method: 'GET',
  url: 'http://webapp8.nantes.sii.fr/' +  '/getAllParticipantById?id=' + eventId })
    .then(getAllParticipantByIdComplete)
    .catch(getAllParticipantByIdFailed);

  function getAllParticipantByIdComplete(response) {
    return response.data;
  }
  function getAllParticipantByIdFailed(response){
    console.log("Error: getAllParticipantById");
    console.log(response);
  }
};

function saveParticipant(idToken, personId, eventId ){
  return $http({
    method: 'POST',
    url: 'http://webapp8.nantes.sii.fr/saveParticipant',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    },
    data: {tokenid:idToken, person: personId, event: eventId}
  })
      .then(saveParticipantComplete)
      .catch(saveParticipantFailed);

    function saveParticipantComplete(response) {
      console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
      return response;
    }
    function saveParticipantFailed(response){
      console.log("Envoi token: Il y a eu des erreurs!");
      alert(JSON.stringify(response));
      return response;
    }
  };

  function cancelParticipation(idToken, personId, eventId ){
    return $http({
      method: 'POST',
      url: 'http://webapp8.nantes.sii.fr/cancelParticipation',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: {tokenid:idToken, person: personId, event: eventId}
        })
        .then(cancelParticipationComplete)
        .catch(cancelParticipationFailed);

      function cancelParticipationComplete(response) {
        console.log("message send");
  			console.log(response);
  			alert(JSON.stringify(response));
  			$window.location.reload();
        return response;
      }

      function cancelParticipationFailed(response){
        console.log("Envoi token: Il y a eu des erreurs!");
        alert(JSON.stringify(response));
        return response;
      }
    }

}

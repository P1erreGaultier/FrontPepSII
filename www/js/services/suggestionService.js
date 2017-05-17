angular.module('app.services')
.factory('suggestion', suggestion)

suggestion.$inject = ['$http', '$ionicHistory', 'personService', '$filter', '$state'];

function suggestion($http, $ionicHistory, personService, $filter, $state) {

  return {
    saveSuggestion: saveSuggestion
  };


  function saveSuggestion(tokenidToSend, suggestionToSend){

    return $http({
  		method: 'POST',
  		url: 'http://webapp8.nantes.sii.fr/saveSuggestion',
  		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  		transformRequest: function(obj) {
  			var str = [];
  			for(var p in obj)
  			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  			return str.join("&");
  		},
  		data: {tokenid:tokenidToSend, suggestion: JSON.stringify(suggestionToSend)}
  	})
      .then(saveSuggestionComplete)
      .catch(saveSuggestionFailed);

    function saveSuggestionComplete(response) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('menu.accueil', {}, {location: 'replace', reload: true})
      return response;
    }
    function getAllEventFailed(response){
  		console.log("Envoi token: Il y a eu des erreurs!");
      return response;
    }
  };

}

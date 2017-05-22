angular.module('app.services')
.factory('suggestion', suggestion)

suggestion.$inject = ['$http', '$ionicHistory', 'personService', '$filter', '$state'];

function suggestion($http, $ionicHistory, personService, $filter, $state) {

  return {
    saveSuggestion: saveSuggestion
  };


  function saveSuggestion(tokenidToSend, suggestionToSend){
    /*console.log("Dans le saveSuggestion");
    return "ok";*/
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
      console.log("Suggestion sauvegardée.");
      return response;
    }
    function saveSuggestionFailed(response){
  		console.log("Envoi suggestion: Il y a eu des erreurs!");
      return response;
    }
  };

}

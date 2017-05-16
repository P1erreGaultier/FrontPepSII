angular.module('app.services')
.factory('searchService', searchService)

searchService.$inject = ['$http'];

function searchService($http) {

  return {
    searchEvent: searchEvent,
  }

  function searchEvent (name) {
    return 	$http({
        method: 'GET',
        url: 'http://webapp8.nantes.sii.fr/' + 'searchEventByName?name=' + name
      })
      .then(searchEventComplete)
      .catch(searchEventFailed);

      function searchEventComplete(response) {
        return response.data;
      }

      function searchEventFailed(response){
        console.log("Error: searchEventFailed");
        console.log(response);
      }
  }
}

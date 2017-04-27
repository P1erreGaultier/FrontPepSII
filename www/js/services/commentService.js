angular.module('app.services')
.factory('commentService', commentService)

eventService.$inject = ['$http'];

function commentService($http) {

  return {
    getCommentByEvent: getCommentByEvent
  }

  function getCommentByEvent(eventId){
    return 	$http({
    		method: 'GET',
    		url: 'http://webapp8.nantes.sii.fr/' + 'getCommentByEvent?id=' + eventId
    	})
      .then(getCommentByEventComplete)
      .catch(getCommentByEventFailed);

      function getCommentByEventComplete(response) {
        return response.data;
      }
      function getCommentByEventFailed(response){
        console.log("Error: getCommentByEventFailed");
        console.log(response);
      }
    };
}

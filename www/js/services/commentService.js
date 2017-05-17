angular.module('app.services')
.factory('commentService', commentService)

eventService.$inject = ['$http'];

function commentService($http) {

  return {
    getCommentByEvent: getCommentByEvent,
    getResponseList: getResponseList,
    registerComment: registerComment
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

    function getResponseList(eventId, commentId){
      return 	$http({
      		method: 'GET',
      		url: 'http://webapp8.nantes.sii.fr/' + 'getResponseList?eventId=' + eventId + '&commentId=' + commentId
      	})
        .then(getResponseListComplete)
        .catch(getResponseListFailed);

        function getResponseListComplete(response) {
          console.log(response);
          return response.data;
        }
        function getResponseListFailed(response){
          console.log("Error: getResponseList");
          console.log(response);
        }
      };

      function registerComment(idToken, commentToSend ){
        return $http({
          method: 'POST',
          url: 'http://webapp8.nantes.sii.fr/saveComment',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {tokenid: idToken, comment: JSON.stringify(commentToSend)}
        })
          .then(registerCommentComplete)
          .catch(registerCommentFailed);

        function registerCommentComplete(response) {
          console.log("message send");
          console.log(response);
        }
        function registerCommentFailed(response){
          console.log(response);
          console.log("Envoi token: Il y a eu des erreurs!");
          return response;
        }
      };

}

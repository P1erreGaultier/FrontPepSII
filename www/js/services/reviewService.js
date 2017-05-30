angular.module('app.services')
.factory('reviewService', reviewService)

reviewService.$inject = ['$http'];

function reviewService($http) {

  return {
    updateReview: updateReview,
  }

  function updateReview(idToken, reviewToSend){
    alert("start");
    return $http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/updateReview',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid: idToken, review: JSON.stringify(reviewToSend)}
		})
      .then(updateReviewComplete)
      .catch(updateReviewFailed);

    function updateReviewComplete(response) {
      console.log("message send");
      console.log(response);
      alert("updateReviewComplete");
      alert(JSON.stringify(response));
      return response;
    }
    function updateReviewFailed(response){
      console.log(response);
      console.log("Envoi token: Il y a eu des erreurs!");
      alert("updateReviewFailed");
      alert(JSON.stringify(response));
      return response;
    }
  };

}

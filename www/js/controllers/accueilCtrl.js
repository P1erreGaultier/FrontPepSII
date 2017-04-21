angular.module('app.controllers')

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'EventService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, EventService) {
		$http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'
		//url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.ListEvent = response.data;
		EventService.saveEvents($scope.ListEvent);
		/*for(i=0; i<$scope.ListEvent.length; i++){
			$scope.ListEvent[i].DateStart = Date.parse($scope.ListEvent[i].DateStart);
		}*/
		$scope.passEvent = function (event){
			EventService.saveEvent(event);
		}
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs sur l'accueil");
		console.log(response);
	});

}])

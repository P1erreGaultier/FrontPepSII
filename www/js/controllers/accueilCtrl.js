angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'CustomFactory', 'BlankService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, CustomFactory, BlankService) {
		console.log("coucou");
		BlankService.sendMessage();
		$http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' + 'getAllEvent'
		//url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		console.log(response);
		$scope.ListEvent = response.data;

		for(i=0; i<$scope.ListEvent.length; i++){
			$scope.ListEvent[i].Datestart = Date.parse($scope.ListEvent[i].Datestart);
		}

		$scope.passEvent = function (event){
			CustomFactory.saveEvent(event);
		}
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs sur l'accueil");
		console.log(response);
	});

}])

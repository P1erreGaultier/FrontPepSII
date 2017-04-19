angular.module('app.controllers')

.controller('suggestionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', '$filter', '$ionicHistory', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, ConnectedUserService, $filter, $ionicHistory, $state) {
$scope.suggestion= function(){
	var date = $filter('date')(new Date(), 'dd/MM/yyyy')
	var responseGoogle = ConnectedUserService.getResponseGoogle();
	alert(JSON.stringify(responseGoogle));
	alert(responseGoogle.idToken);
	var suggestionToSend = {
		"Text" : document.getElementById("text").value,
		"Job" : ConnectedUserService.getConnectedUser().Job,
		"Date" : date
	};

	$http({
		method: 'POST',
		url: 'http://webapp8.nantes.sii.fr/saveSuggestion',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
			var str = [];
			for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		},
		data: {tokenid:responseGoogle.idToken, suggestion: JSON.stringify(suggestionToSend)}
	}).then(function successCallback(response) {
		console.log("message send");
		console.log(response);
		alert(JSON.stringify(response));
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.accueil', {}, {location: 'replace', reload: true})
	}, function erroCallabck(response) {
		console.log(response);
		console.log("Envoi token: Il y a eu des erreurs!");
		alert(JSON.stringify(response));
	});
}
}])

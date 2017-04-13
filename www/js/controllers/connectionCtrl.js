angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('connectionCtrl', ['$scope', '$stateParams', '$window', '$http', 'ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $http, ConnectedUserService) {

	function onSuccess(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		console.log(googleUser);
		console.log(googleUser.getBasicProfile());
		alert('success')
	}
	function onFailure(error) {
		console.log(error);
		alert('error')
	}

		gapi.signin2.render('my-signin2', {
			'redirect_uri': 'http://localhost:8100',
			'scope': 'openid',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': onSuccess,
			'onfailure': onFailure
		});
	/*$scope.login=function() {
		var client_id="929890661942-49n2pcequcmns19fe1omff72tqcips1v.apps.googleusercontent.com";
		$cordovaOauth.google(client_id, ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result){
			alert(JSON.stringify(result));
			console.log(result);
		}, function(error){
			alert('error');
		});
		var scope="openid";
		var redirect_uri="http://localhost:8100/";
		var response_type="token";
		var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
		"&response_type="+response_type;
		window.location.replace(url);

	};*/


	$scope.connection = function(){

		$http({
			method: 'GET',
			url: 'http://webapp8.nantes.sii.fr/' + '/getPerson?id=' + document.getElementById("connction").value
			//url: 'http://NANTES-0156.sii.fr:4444/' + '/getPerson?id=' + document.getElementById("connction").value
		}).then(function successCallback(response) {
			alert("bien joué!")
			console.log(response);
			ConnectedUserService.setConnectedUser(response.data);
			ConnectedUserService.setConnected("true");
			console.log("Connecté en tant que: ");
			console.log(ConnectedUserService.getConnectedUser());
			$window.history.back();
			//$window.location.href = '/#/side-menu21/page1';
		}, function erroCallabck(response) {
			alert('impossible de récupérer cette personne');
			alert('status: ' + response.status + ' / statusText: ' + response.statusText);
			console.log("Il y a eu des erreurs!");
		});
	}

}])

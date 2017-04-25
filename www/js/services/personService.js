angular.module('app.services')
.factory('person', person)

suggestion.$inject = ['$http','$window', '$ionicHistory'];

function person($http, $window, $ionicHistory) {

  var connectedUser;
  var connected = "false";
  var googleId;
  var responseGoogle;

  return {
    registerPerson : registerPerson,
    connect : connect
  };

function registerPerson(idToken, personToSend ){
    return $http({
			method: 'POST',
			url: 'http://webapp8.nantes.sii.fr/registerPerson',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {tokenid: idToken, person: JSON.stringify(personToSend)}
		})
      .then(registerPersonComplete)
      .catch(registerPersonFailed);

    function registerPersonComplete(response) {
      console.log("message send");
			console.log(response);
			alert(JSON.stringify(response));
      return response;
    }
    function registerPersonFailed(response){
      console.log("Envoi token: Il y a eu des erreurs!");
      alert(JSON.stringify(response));
      return response;
    }
  };

  function connect(){
    window.plugins.googleplus.login(
    {'webClientId': '784894623300-gmkq3hut99f16n220kjimotv0os7vt2e.apps.googleusercontent.com',},
    function (responseGoogle) {
      return $http({
        method: 'POST',
        url: 'http://webapp8.nantes.sii.fr/connect',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
        data: {tokenid: responseGoogle.idToken}
      })
      .then(connectComplete)
      .catch(connectFailed);
  }
  function connectComplete(response) {
    if (response.data == null){
      ConnectedUserService.setResponseGoogle(responseGoogle);
      $state.go('menu.inscription');
    }else{
      ConnectedUserService.setConnectedUser(response.data);
      ConnectedUserService.setResponseGoogle(responseGoogle);
      ConnectedUserService.setConnected("true");
      //$window.history.back();
      $state.reload();
    return response;
  }
  function connectFailed(response){
    console.log("Envoi token: Il y a eu des erreurs!");
    alert(JSON.stringify(response));
    return response;
  }

}

}

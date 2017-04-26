angular.module('app.services')
.factory('personService', personService)

suggestion.$inject = ['$http','$window', '$ionicHistory'];

function personService($http, $window, $ionicHistory) {

  var connectedUser;
  var connected = "false";
  var googleId;
  var responseGoogle;

  return {
    registerPerson : registerPerson,
    connect : connect,
    getPersonById : getPersonById,
    getConnected : getConnected,
    setConnected : setConnected,
    getConnectedUser : getConnectedUser,
    setConnectedUser : setConnectedUser,
    getResponseGoogle : getResponseGoogle,
    setResponseGoogle : setResponseGoogle

  };

  function getConnected (){
    return connected;
  }

  function getConnectedUser (){
    return connectedUser;
  }

  function setConnected (connect){
    connected = connect;
  }

  function setConnectedUser (user){
    connectedUser = user;
  }

  function getResponseGoogle (){
    return responseGoogle;
  }

  function setResponseGoogle (response){
    responseGoogle = response;
  }

  function getPersonById(personId){
    return $http({
  	method: 'GET',
  	url: 'http://webapp8.nantes.sii.fr/' +  '/getPersonById?id=' + personId })
      .then(getPersonByIdComplete)
      .catch(getPersonByIdFailed);

    function getPersonByIdComplete(response) {
      return response.data;
    }
    function getPersonByIdFailed(response){
      console.log("Error: getAllEvent");
      console.log(response);
    }
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
    function (responseG) {
      responseGoogle = responseG;
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
        data: {tokenid: responseG.idToken}
      })
      .then(connectComplete)
      .catch(connectFailed);
    }
  )}

  function connectComplete(response) {
    if (response.data == null){
      $state.go('menu.inscription');
    }else{
      connectedUser =response.data;
      connected = "true";
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

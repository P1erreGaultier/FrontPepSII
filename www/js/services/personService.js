angular.module('app.services')
.factory('personService', personService)

suggestion.$inject = ['$http','$window', '$ionicHistory', '$state'];

function personService($http, $window, $ionicHistory, $state) {

  var connectedUser;
  var connected = "false";
  var googleId;
  var responseGoogle;
  var previousPage;

  return {
    registerPerson : registerPerson,
    connect : connect,
    getPersonById : getPersonById,
    getConnected : getConnected,
    setConnected : setConnected,
    getConnectedUser : getConnectedUser,
    setConnectedUser : setConnectedUser,
    getResponseGoogle : getResponseGoogle,
    setResponseGoogle : setResponseGoogle,
    getGoogleId : getGoogleId,
    setGoogleId : setGoogleId,
    getGooglePicture : getGooglePicture,
    setPreviousPage: setPreviousPage,
    getPreviousPage: getPreviousPage
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

  function getGoogleId (){
    return googleId;
  }

  function setGoogleId (id){
    googleId = id;
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

  function getGooglePicture(email){
    console.log(email);
    return $http({
    method: 'GET',
    url: 'http://picasaweb.google.com/data/entry/api/user/' + email +'?alt=json'})
      .then(getGooglePictureComplete)
      .catch(getGooglePictureFailed);
    function getGooglePictureComplete(response) {
      console.log(response.data.entry.gphoto$thumbnail.$t);
      return response.data.entry.gphoto$thumbnail.$t;
    }
    function getGooglePictureFailed(response){
      console.log("Error: getGooglePicture");
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
      connectedUser =response.data;
      connected = "true";
      return response;
    }
    function registerPersonFailed(response){
      console.log("Envoi token: Il y a eu des erreurs!");
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
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('menu.accueil', {}, {location: 'replace', reload: true})
      return response;
  }

  function connectFailed(response){
    console.log("Envoi token: Il y a eu des erreurs!");
    return response;
  }
  }

  function setPreviousPage(page){
    previousPage = page;
  }

  function getPreviousPage() {
    return previousPage;
  }

}

angular.module('app.services', [])

.factory('CustomFactory', [function(){
  var event;
  return {
    coucouGlobal : function(name) {
      console.log('Coucou ' + name);
      return "oui";
    },

    saveEvent : function(eventToSave) {
      event = eventToSave;
    },

    getEvent : function() {
      return event;
    }
  };
}])

.service('ConnectedUserService', [function(){
  var connectedUser;
  var connected = "false";

  return {
    setConnectedUser: function(user) {
      connectedUser = user;
    },

    getConnectedUser: function() {
      return connectedUser;
    },

    setConnected: function(connect) {
      connected = connect;
    },

    IsConnected: function() {
      return connected;
    }
  }
}])

.service('BlankService', [function(){
  return {
    sendMessage : function (){
      console.log("test")
      return "test";
    }
  }
}]);

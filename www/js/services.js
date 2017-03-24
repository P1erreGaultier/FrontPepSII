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
  return {
    setConnectedUser: function(user) {
      connectedUser = user;
    },

    getConnectedUser: function() {
      return connectedUser;
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

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

.service('EventService', [function(){
  var event;
  var events;

  return {
    saveEvent : function(eventToSave) {
      event = eventToSave;
    },

    getEvent : function() {
      return event;
    },

    saveEvents : function(eventsToSave) {
      events = eventsToSave;
    },

    getEvents : function() {
      return events;
    }
  };
}])

.service('ConnectedUserService', [function(){
  var connectedUser;
  var connected = "false";
  var googleId;
  var responseGoogle;

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

    isConnected: function() {
      return connected;
    },

    setGoogleId: function(id) {
      googleId = id;
    },

    getGoogleId: function() {
      return googleId;
    },

    setResponseGoogle: function(google) {
      responseGoogle = google;
    },

    getResponseGoogle: function() {
      return responseGoogle;
    }
  }
}])

.service('GoogleService', [function(){
  var gu;
  return {
    saveGU : function(guToSave) {
      gu = guToSave;
    },

    getGU : function(){
      return gu;
    }
  }
}]);

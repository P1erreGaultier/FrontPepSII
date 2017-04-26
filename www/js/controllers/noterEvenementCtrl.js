angular.module('app.controllers')

.controller('noterEvenementCtrl', ['eventService',
function (eventService) {
  var vm = this;
  vm.event = "";
  vm.noteEvent = noteEvent;

  activate()

  function activate() {
    vm.event = eventService.getEvent();
  }

  function noteEvent() {
    var note = document.getElementById("note").value;
    var comment = document.getElementById("comment").value;
    console.log(note);
    console.log(comment);
  }
}])

angular.module('app.directives')
.directive("menu", function() {
  return {
  restrict : 'E',
  templateURL: "template/menuConnection.html",
  controller: "menuConnectionCtrl",
  controllerAs: "vm"
  }
})

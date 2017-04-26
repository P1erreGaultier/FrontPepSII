var myApp =  angular.module('app.directives',[])

.directive("menu", function() {
  return {
  restrict : 'E',
  templateUrl: "templates/menuConnection.html"
  }
})

angular.module('app.controllers')
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $state, ConnectedUserService) {
	$scope.checkUser = function() {
		console.log("checkUser");
		if (ConnectedUserService.isConnected() != "true"){
			//$state.go('menu.connection', {}, {location: 'replace', reload: true})
			/*$location.path('/#/side-menu21/page14');
			$window.location.reload();*/
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.connection', {}, {location: 'replace', reload: true});
		}else {
			$state.go('menu.mesVenements', {}, {location: 'replace', reload: true});
		}
	}
}])

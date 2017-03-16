angular.module('app.controllers', [])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
		console.log("coucou")
		$http({
  	method: 'GET',
  	url: 'http://NANTES-0150.sii.fr:4444/getAllEvent'
	}).then(function successCallback(response) {
		$scope.ListEvent = response.data.ArrayList;
		console.log("oui");
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs");
		console.log(response);
		});

}])

.controller('rechercheCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('carteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	var options = {timeout: 10000, enableHighAccuracy: true};

	var latLng = new google.maps.LatLng(47.2112216, -1.5570168);

	var mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({position:new google.maps.LatLng(47.2112216, -1.5570168)});
	marker.setMap($scope.map);
	var infowindow = new google.maps.InfoWindow({
		content: "<div style=\"display:inline-block\"><img src=\"img/logo.png\"style=\"display:inline;width:50px;height:50px;\"></div>" +
				"<div style=\"display:inline-block\"><p>22 rue oui</p><p>***</p></div>"
	});

	marker.addListener('click', function() {
		infowindow.open($scope.map, marker);
	  });

}])

.controller('footEnSalleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  //sum to test jasmine/karma
  $scope.sum = function() {
   $scope.z = $scope.x + $scope.y;
  };

}])

.controller('afterworkCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('dejTechCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mesVenementsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('crErUnVenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('suggestionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('evaluerEvenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
	console.log($stateParams);
	$scope.getCommentMargin = function(owner){
		console.log("J'arrive à la condition");
		if (owner == null){
			console.log("Je suis dans le if");
			return "0%";
		}else {
			console.log("Je suis dans le else");
			return "5%";
		}
	}
	$scope.TitleEvent = $stateParams.Name;
	$scope.sourceImgEvent = "img/defaultImage.jpg";
	$scope.descriptionEvent = $stateParams.Description;
	$scope.dateStartEvent = $stateParams.Datestart;
	$http({
		method: 'GET',
		url: 'http://nantes-0150.sii.fr:4444/getCommentByEvent?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListComment = response.data;
		console.log("oui");
		console.log($scope.ListComment);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
	});
	/*console.log($stateParams.event)
	console.log($stateParams.event.Name)*/
}])

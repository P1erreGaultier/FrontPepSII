angular.module('app.controllers')

.controller('detailsEventCtrl', ['$stateParams', '$window', '$http','eventService','personService','commentService','participantService', '$state', '$filter', '$ionicPopup', 'reviewService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams, $window, $http, eventService,personService,commentService,participantService, $state, $filter, $ionicPopup, reviewService) {
	var vm = this;
	vm.data = {};
	vm.event;
	vm.isRegister;
	vm.dateOfDay;
	vm.connectedUser;
	vm.isLogged;
	vm.ListCommentResponse = [];
	vm.registerUserToEvent = registerUserToEvent;
	vm.unregisterUserToEvent = unregisterUserToEvent;
	vm.getCommentMargin = getCommentMargin;
	vm.cancelEvent = cancelEvent;
	vm.detailsParticipant = detailsParticipant;
	vm.swipeOnImage = swipeOnImage;
	vm.formatDate = formatDate;
	vm.displayRateForm = displayRateForm;
	vm.hideRateForm = hideRateForm;
	vm.noteEvent = noteEvent;
	vm.openPopup = openPopup;
	vm.registerComment = registerComment;
	vm.showResponse = showResponse;
	vm.imageToDisplay = "";
	vm.getGoogleImage = getGoogleImage;
	vm.images = {};

	activate();

	function activate(){
		vm.dateOfDay = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
		if (personService.getConnectedUser() == null){
			vm.connectedUser = -1;
			vm.isLogged = "false"
		} else {
			vm.connectedUser = personService.getConnectedUser().PersonId;
			vm.isLogged = "true"
		}
		vm.event = eventService.getEvent();

		var rng = Math.random();
		if(rng < 0.4){
			vm.imageToDisplay = "grosChat.jpg";
		} else if(rng < 0.8) {
			vm.imageToDisplay = "chaton.jpg";
		} else if (rng < 0.98){
			vm.imageToDisplay = "defaultUser2.jpg";
		} else {
			vm.imageToDisplay = "d74c8cec9490f925a191d4f677fb37ae.jpg"
		}

		commentService.getCommentByEvent(vm.event.EventId)
		.then(function successCallback(response) {
			vm.ListComment = response.reverse();
			console.log(response);
		}, function erroCallabck(response) {
			console.log("Il y a eu des erreurs!")
			console.log(response);
		});

		participantService.getAllParticipantById(vm.event.EventId)
		.then(function successCallback(response) {
			console.log(response);
			vm.ListParticipant = response;
			vm.nbParticipants = vm.ListParticipant.length;
			if (personService.getConnectedUser() == null){
				vm.isRegister = "null";
			}else {
				var isRegister = "false";
				for(i=0;i<vm.ListParticipant.length;i++){
					if(vm.ListParticipant[i].PersonId == personService.getConnectedUser().PersonId){
						isRegister = "true";
					}
				}
				if (isRegister == "true"){
					vm.isRegister = "true";
				}else{
					vm.isRegister = "false";
				}
			}
			console.log("isRegister");
			console.log(vm.isRegister);
		}, function erroCallabck(response) {
			console.log("Participant: Il y a eu des erreurs!")
			console.log(response);
		});

	}

	function registerUserToEvent () {
		participantService.saveParticipant(personService.getResponseGoogle().idToken, personService.getConnectedUser().PersonId, eventService.getEvent().EventId)
		.then(function(response){
			vm.isRegister = "true";
		})
	}

	function unregisterUserToEvent() {
		participantService.cancelParticipation(personService.getResponseGoogle().idToken, personService.getConnectedUser().PersonId, eventService.getEvent().EventId)
		.then(function(response){
			vm.isRegister = "false";
		})
	}

	function getCommentMargin(owner){
		if (owner == null){
			return "0%";
		}else {
			return "5%";
		}
	}

	function cancelEvent() {
		var responseGoogle = personService.getResponseGoogle();
		var eventToSend = {
			"EventId" : vm.event.EventId,
			"Name" : vm.event.Name,
			"DateStart" : vm.event.DateStart,
			"DateEnd" : vm.event.DateEnd,
			"PlaceId" : vm.event.PlaceId,
			"Description": vm.event.Description,
			"Image" : vm.event.Image,
			"IsCanceled" : 1,
			"Owner" : vm.event.Owner,
			"EventType" : vm.event.EventType
		};
		eventService.registerEvent(responseGoogle.idToken,eventToSend);
		alert('Votre évènement à bien été annulé');
	}

	function detailsParticipant(){
		var div = document.getElementById("participantDiv");
		if (div.style.display == 'none'){
			div.style.display = 'block';
		}else{
			div.style.display = 'none';
		}
	}

	function displayRateForm() {
		document.getElementById("ratingForm").style.display = "block";
		document.getElementById("beforeRate").style.display = "none";
	}

	function hideRateForm() {
		document.getElementById("ratingForm").style.display = "none";
		document.getElementById("beforeRate").style.display = "block";
	}

	function noteEvent() {
		var note = document.getElementById("note").value;
		var comment = document.getElementById("comment").value;
		console.log(note);
		console.log(comment);

		var reviewToSend = {
			"person" : personService.getConnectedUser().PersonId,
			"event" : vm.event.EventId,
			"rate" : note,
			"text" : comment
		};

		reviewService.updateReview(personService.getResponseGoogle().idToken, reviewToSend )
		.then(function(result){
			vm.hideRateForm();
		})
	}

	function registerComment(responseTo) {
		if (responseTo == 'NULL'){
			responseTo = null;
		}
		var commentToSend = {
			"ResponseTo" : responseTo,
			"Text" : document.getElementById("commentText").value,
			"DatePost" : $filter('date')(new Date(), 'yyyy-MM-dd HH:mm'),
			"EventId" : vm.event.EventId,
			"PersonId" : personService.getConnectedUser().PersonId,
			"Person" : personService.getConnectedUser()
		};

		commentService.registerComment(personService.getResponseGoogle().idToken, commentToSend )
		.then(function(result){
			commentService.getCommentByEvent(vm.event.EventId)
			.then(function successCallback(response) {
				vm.ListComment = response.reverse();
				console.log(response);
			}, function erroCallabck(response) {
				console.log("Il y a eu des erreurs!")
				console.log(response);
			});
		})
	}

	function swipeOnImage() {
		/*var audio = new Audio('img/986.mp3');
		audio.play();*/
	}

	function formatDate(date){
    var dateOut = new Date(date);
    return dateOut;
  }

	function getGoogleImage(email){
		var res = personService.getGooglePicture(email)
		.then(function(result){
			if (!(email in vm.images)){
				vm.images[email]=result;
			}
			return result;
		})
		.catch(function(error){console.log(error)});
		return res;
	}

	function openPopup(responseTo, $event) {

		var myPopup = $ionicPopup.show({
         template: '<textarea id="commentText" rows="6" cols="150" maxlength="300" ng-model="data.model" ng-model="vm.data.comment" ></textarea>',
         title: 'Commentaire',
         subTitle: 'Les commentaires que vous rentrez doivent être assumés, ils ne pourront pas être effacés!',

         buttons: [
            { text: 'Annuler' }, {
               text: '<b>Commenter</b>',
               type: 'button-positive',
                  onTap: function(e) {
										if (!document.getElementById("commentText").value.trim()) {
					             e.preventDefault();
					           } else {
					             return document.getElementById("commentText").value;
					           }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
				if (res){
					registerComment(responseTo);
				}
      });
			$event.stopPropagation();
	}

	function showResponse(eventId, commentId, $event) {
		if (vm.ListCommentResponse[commentId] == undefined || vm.ListCommentResponse[commentId].length == 0){
			commentService.getResponseList(eventId, commentId)
			.then(function(result){
				vm.ListCommentResponse[commentId] = result.reverse();
			})
			$event.stopPropagation();
		} else {
			vm.ListCommentResponse[commentId] = [];
		}
	}

}])

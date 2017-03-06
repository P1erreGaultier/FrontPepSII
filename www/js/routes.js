angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.accueil', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/accueil.html',
        controller: 'accueilCtrl'
      }
    }
  })

  .state('menu.recherche', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recherche.html',
        controller: 'rechercheCtrl'
      }
    }
  })

  .state('menu.carte', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/carte.html',
        controller: 'carteCtrl'
      }
    }
  })

  .state('menu.footEnSalle', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/footEnSalle.html',
        controller: 'footEnSalleCtrl'
      }
    }
  })

  .state('menu.afterwork', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/afterwork.html',
        controller: 'afterworkCtrl'
      }
    }
  })

  .state('menu.dejTech', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dejTech.html',
        controller: 'dejTechCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.mesVenements', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mesVenements.html',
        controller: 'mesVenementsCtrl'
      }
    }
  })

  .state('menu.crErUnVenement', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/crErUnVenement.html',
        controller: 'crErUnVenementCtrl'
      }
    }
  })

  .state('menu.suggestion', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/suggestion.html',
        controller: 'suggestionCtrl'
      }
    }
  })

  .state('menu.evaluerEvenement', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/evaluerEvenement.html',
        controller: 'evaluerEvenementCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});
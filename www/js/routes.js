angular.module('app.routes', [])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider' ,function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract: true,
    //requireADLogin: true,
  })

  .state('tabsController.projects', {
      url: '/project-list',
      //requireADLogin: true,
    views: {
      'tab2': {
        templateUrl: 'templates/projects.html',
        controller: 'projectsCtrl'
      }
    }
  })

  .state('tabsController.opportunities', {
      url: '/opportunity-list',
      //requireADLogin: true,
    views: {
      'tab4': {
        templateUrl: 'templates/opportunities.html',
        controller: 'opportunitiesCtrl'
      }
    }
  })

  .state('tabsController.tickets', {
      url: '/ticket-list',
      //requireADLogin: true,
    views: {
      'tab5': {
        templateUrl: 'templates/tickets.html',
        controller: 'ticketsCtrl'
      }
    }
  })

  .state('tabsController.nominals', {
      url: '/nominal-list',
      //requireADLogin: true,
        views: {
          'tab3': {
            templateUrl: 'templates/nominals.html',
            controller: 'nominalsCtrl'
          }
        }
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
  })

  .state('splashScreen', {
      url: '/splash',
    templateUrl: 'templates/splashScreen.html',
    controller: 'splashScreenCtrl'
  })

  .state('tabsController.projectTimeCaptureDetails', {
      url: '/project-details/:Id',
      //requireADLogin: true,
    views: {
      'tab2': {
        templateUrl: 'templates/projectTimeCaptureDetails.html',
        controller: 'projectTimeCaptureDetailsCtrl'
      }
    }
  })

  .state('tabsController.supportTimeCaptureDetails', {
      url: '/support-details/:Id',
      //requireADLogin: true,
    views: {
      'tab5': {
        templateUrl: 'templates/supportTimeCaptureDetails.html',
        controller: 'supportTimeCaptureDetailsCtrl'
      }
    }
  })

  .state('tabsController.supportTimeCaptureNotes', {
      url: '/support-notes/:Id',
      //requireADLogin: true,
    views: {
      'tab5': {
        templateUrl: 'templates/supportTimeCaptureNotes.html',
        controller: 'supportTimeCaptureNotesCtrl'
      }
    }
  })

  .state('tabsController.opportunityTimeCaptureDetails', {
      url: '/opportunity-details/:Id',
      //requireADLogin: true,
    views: {
      'tab4': {
        templateUrl: 'templates/opportunityTimeCaptureDetails.html',
        controller: 'opportunityTimeCaptureDetailsCtrl'
      }
    }
  })

  .state('tabsController.nominalTimeCaptureDetails', {
      url: '/nominal-details/:Id',
      //requireADLogin: true,
    views: {
      'tab3': {
        templateUrl: 'templates/nominalTimeCaptureDetails.html',
        controller: 'nominalTimeCaptureDetailsCtrl'
      }
    }
  })

  .state('tabsController.projectTimeCaptureLogTime', {
      url: '/project-time/:Id',
      //requireADLogin: true,
    views: {
      'tab2': {
        templateUrl: 'templates/projectTimeCaptureLogTime.html',
        controller: 'projectTimeCaptureLogTimeCtrl'
      }
    }
  })

  .state('tabsController.supportTimeCaptureLogTime', {
      url: '/support-time/:Id',
      //requireADLogin: true,
    views: {
      'tab5': {
        templateUrl: 'templates/supportTimeCaptureLogTime.html',
        controller: 'supportTimeCaptureLogTimeCtrl'
      }
    }
  })

  .state('tabsController.opportunityTimeCaptureLogTime', {
      url: '/opportunity-time/:Id',
      //requireADLogin: true,
    views: {
      'tab4': {
        templateUrl: 'templates/opportunityTimeCaptureLogTime.html',
        controller: 'opportunityTimeCaptureLogTimeCtrl',
      }
    }
  })

  .state('tabsController.nominalTimeCaptureLogTime', {
      url: '/nominal-time/:Id',
    views: {
      'tab3': {
        templateUrl: 'templates/nominalTimeCaptureLogTime.html',
        controller: 'nominalTimeCaptureLogTimeCtrl'
      }
    }
  })
  

  .state('landingPage', {
      url: '/landing-page',
    templateUrl: 'templates/landingPage.html',
    controller: 'landingPageCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/landing-page');
  $urlRouterProvider.otherwise('/login');

	
  //adalProvider.init(
  //      {
  //          instance: 'https://login.microsoftonline.com/', 
  //          tenant: 'http://IntellicoreITrakData',
  //          clientId: '79eb69a3-eed2-412d-95e7-18c36d986ccd',
  //          extraQueryParameter: 'nux=1',
  //          //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
   //     },
   //     $httpProvider
   //     );
}]);
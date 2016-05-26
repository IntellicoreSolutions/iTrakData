// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'AdalAngular', 'stopWatchApp', 'tabSlideBox'])

angular.module('Authentication', [])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//For ADAL Authentication - Not sure we can use this with ADFS on Server 2012 R2 - Needs to be 2016 server
//.config(['$httpProvider', 'adalAuthenticationServiceProvider', function ($httpProvider, adalProvider) {
//    adalProvider.init(
//          {
//              instance: 'https://login.microsoftonline.com/', 
//              tenant: 'http://192.168.1.65:8100/',
//              clientId: '79eb69a3-eed2-412d-95e7-18c36d986ccd',
//             extraQueryParameter: 'nux=1',
//              cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
//         },
//         $httpProvider
//         );
//}])

    // .config(function($stateProvider, $urlRouterProvider) {
    //     $stateProvider
    //
    //         .state('login', {
    //             url: '/login',
    //             views: {
    //                 'page': {
    //                     templateUrl: 'templates/login.html',
    //                     controller: 'loginCtrl'
    //
    //                 }
    //             }
    //         })
    //
    //
    //         .state('projects', {
    //             url: '/projects',
    //             abstract: true,
    //             templateUrl: 'templates/menu.html',
    //             controller: 'projectsCtrl'
    //         })
    //
    //
    //     // if none of the above states are matched, use this as the fallback
    //     $urlRouterProvider.otherwise('/login');
    // })


.run(['$rootScope', '$location', '$http', '$state',
    function ($rootScope, $location, $http, $state) {
        // keep user logged in after page refresh
        $rootScope.globals = $window.localStorage.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $state.go('login');
            }
        });
    }]);





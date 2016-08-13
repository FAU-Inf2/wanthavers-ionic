// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var server = "https://wanthaver.com:8443";
var wanthaver = angular.module('starter', ['ionic', 'starter.controllers',
    'angularMoment', 'base64', 'ionic-ratings',
    'pascalprecht.translate', 'tmh.dynamicLocale', 'uiGmapgoogle-maps']);
var controllers = angular.module('starter.controllers', []);

wanthaver.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
});

wanthaver.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.backButton.previousTitleText(false).text('');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.startup', {
    url: '/startup',
    views: {
      'menuContent': {
        templateUrl: 'templates/startup.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.desirelist', {
      url: '/desirelist',
      views: {
        'menuContent': {
          templateUrl: 'templates/desirelist.html',
          controller: 'DesireListCtrl'
        }
      }
  })

  .state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'LoginCtrl'
          }
      }
  })

  .state('app.signup', {
      url: '/signup',
      views: {
          'menuContent': {
              templateUrl: 'templates/signup.html',
              controller: 'LoginCtrl'
          }
      }
  })

  .state('app.desiredetail', {
      url: '/desiredetail/:desireId',
      views: {
          'menuContent': {
              templateUrl: 'templates/desiredetail.html',
              controller: 'DesireDetailCtrl'
          }
      }
  })
      
  .state('app.chatmessages', {
      url: '/messages/:chatId',
      views: {
          'menuContent': {
              templateUrl: 'templates/chat.html',
              controller: 'ChatMessagesCtrl'
          }
      }
  })

  .state('app.chatlist', {
      url: '/chatlist',
      views: {
          'menuContent': {
              templateUrl: 'templates/chatlist.html',
              controller: 'ChatListCtrl'
          }
      }
  })

  .state('app.filtersetting', {
      url: '/filtersetting',
      views: {
          'menuContent': {
              templateUrl: 'templates/filtersetting.html',
              controller: 'FilterSettingCtrl'
          }
      }
  })

  .state('app.desirecreate', {
      url: '/desirecreate',
      views: {
          'menuContent': {
              templateUrl: 'templates/desirecreate.html',
              controller: 'DesireCreateCtrl'
          }
      }
  })

  .state('app.settings', {
       url: '/settings',
       views: {
           'menuContent': {
               templateUrl: 'templates/settings.html',
               controller: 'SettingsCtrl'
           }
       }
  })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/startup');
});

wanthaver.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});

wanthaver.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBEOZHjo8LFtEyR9ETUkVnVsEXWqwUaMzE',
        //v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

if(!('contains' in String.prototype)) {
    String.prototype.contains = function(str, startIndex) {
        return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
}
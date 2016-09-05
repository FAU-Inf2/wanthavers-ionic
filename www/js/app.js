// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var server = "https://wanthaver.com:8443";
var wanthaver = angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers',
    'angularMoment', 'base64',
    'pascalprecht.translate',
    'tmh.dynamicLocale', 'ngCordova',
    'monospaced.elastic']);
var controllers = angular.module('starter.controllers', []);

wanthaver.run(['$ionicPlatform', 'PushNotifications', function($ionicPlatform, PushNotifications) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
        alert("keyboard init");
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



      if(window.cordovaReady != undefined){
          for(var i=0;i<window.cordovaReady.length;i++){
              window.cordovaReady[i]();
          }
      }
      window.cordovaReady = "FIRED";



      /** FIXING MAP BUG: START */

      var map = plugin.google.maps.Map.getMap({
          'controls': {
              'myLocationButton': true
          },
          'camera': {
              'zoom': 16
          }
      });

      map.getLicenseInfo(function(txt, txt1) {
          window.mapLicense = txt;
      });

      var request = {
          'position': new plugin.google.maps.LatLng(37.422476, -122.08425)
      };

      plugin.google.maps.Geocoder.geocode(request, function (results) {});


      /** FIXING MAP BUG: END */
  });
}]);

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
      url: '/desirelist/:mode',
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

  .state('app.rating', {
      url: '/rating',
      params: { desire: null, haver: null },
      views: {
          'menuContent': {
              templateUrl: 'templates/rating.html',
              controller: 'RatingCtrl'
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
  .state('app.about', {
      url: '/about',
      views: {
          'menuContent': {
              templateUrl: 'templates/about.html'
          }
      }
  })
  .state('app.licenses', {
      url: '/licenses',
      views: {
          'menuContent': {
              templateUrl: 'templates/licenses.html'
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

if(!('contains' in String.prototype)) {
    String.prototype.contains = function(str, startIndex) {
        return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
}

wanthaver.directive('preventDrag', function ($ionicGesture, $ionicSlideBoxDelegate) {
    return {
        restrict: 'A',
        link    : function (scope, elem) {
            var reportEvent = function (e) {
                console.log(e)
                if (e.target.tagName.toLowerCase() === 'input') {
                    $ionicSlideBoxDelegate.enableSlide(false);
                } else {
                    $ionicSlideBoxDelegate.enableSlide(true);
                }
            };
            $ionicGesture.on('touch', reportEvent, elem);
        }
    }});

wanthaver.directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var focusedElement;
            element.on('click', function () {
                if (focusedElement != this) {
                    this.select();
                    focusedElement = this;
                }
            });
            element.on('blur', function () {
                focusedElement = null;
            });
        }
    };
})

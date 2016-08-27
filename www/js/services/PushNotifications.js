wanthaver.factory('PushNotifications', ['$rootScope', '$cordovaPushV5', '$state', '$ionicPopup', '$http', 'CloudMessageSubject', 'Chat',
   function ($rootScope, $cordovaPushV5, $state, $ionicPopup, $http, CloudMessageSubject, Chat) {

    return {
      options: {
         android: {},
         ios: {
            alert: "true",
            badge: "true",
            sound: "true"
         },
         windows: {},
         browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      },

      registerToken: function() {
         $cordovaPushV5.initialize(this.options).then(function() {
            // Start listening
            $cordovaPushV5.onNotification();
            $cordovaPushV5.onError();

            $cordovaPushV5.register().then(function(tokenID) {
               this.createToken(tokenID);
            });
         });

         $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
            this[data.additionalData.subject](data.additionalData);
            alert(data);
            $cordovaPushV5.finish(); //for iOS
         });
         $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e) {
            console.err(e);
         });
      },

      createToken: function(tokenID) {
         console.log('createToken', tokenID);
         //return $http.post(server+'/v1/users/tokens', {token: token}, Auth.getHeaderObject());
      },

      /** For handle functions see CloudMessageSubject **/
      // CloudMessageSubject.NEWMESSAGE
      NewMessage: function(data) {
         chatId = data[CloudMessageSubject.NEWMESSAGE_CHATID];

         // Check if notification was recieved while app was in foreground
         if(data.additionalData.foreground)
            //TODO: change buttons
            console.log("Recieved new message on foreground");
         else
            // Open chat
            $state.go('app.chatmessages', {chatId: chatId});
      },

      // CloudMessageSubject.DESIRECOMPLETE
      DesireComplete: function(notification) {

      },

      // CloudMessageSubject.HAVERACCEPTED
      HaverAccepted: function(notification) {

      },

      // CloudMessageSubject.HAVERREJECTED
      HaverRejected: function(notification) {

      },

      // CloudMessageSubject.NEWHAVER
      NewHaver: function(notification) {

      }

   };
}]);

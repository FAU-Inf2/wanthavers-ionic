wanthaver.factory('PushNotifications', ['$ionicPush', '$state', '$ionicPopup', 'CloudMessageSubject', 'Chat', function ($ionicPush, $state, $ionicPopup, CloudMessageSubject, Chat) {

    return {

      registerToken: function() {
         $ionicPush.init({
            'debug': true,
            'onNotification': (function(notification) {
               var payload = notification.text; // TODO: change this to actual payload
               console.log('notification', notification);
               console.log('Notification handle function', this[payload]);

               // Call function of PushNotifications with name in variable payload
               this[payload](notification);
            }).bind(this),
            'onRegister': this.createToken
         });

         $ionicPush.register();
      },

      createToken: function(token) {
         console.log('createToken', token._token);
         //return $http.post(server+'/v1/users/tokens', {token: token}, Auth.getHeaderObject());
      },

      /** For handle functions see CloudMessageSubject **/
      // CloudMessageSubject.NEWMESSAGE
      NewMessage: function(notification) {
         //chatId = payload[CloudMessageSubject.NEWMESSAGE_CHATID];

         chatId = 'Ck7J1x0xpA';
         //Chat.getMessagesByChatId(chatId);

         confirmPopup = $ionicPopup.confirm({
            title: 'New Chat Message',
            template: 'Open Chat?'
         }).then(function(res) {
            if(res) {
               $state.go('app.chatmessages', {chatId: chatId});
            }
         });

         //alert("OnNewMessage");
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

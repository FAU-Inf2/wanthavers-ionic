wanthaver.factory('PushNotifications', ['$rootScope', '$cordovaPushV5', '$state', '$ionicPopup', '$http', '$stateParams', 'CloudMessageSubject', 'Chat', 'Auth', 'User', 'Desire',
   function ($rootScope, $cordovaPushV5, $state, $ionicPopup, $http, $stateParams, CloudMessageSubject, Chat, Auth, User, Desire) {

    return {
      token: "",

      options: {
         android: {},
         ios: {
            alert: "true",
            badge: "true",
            sound: "true",
            clearBadge: "true"
         },
         windows: {},
         browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      },

      registerToken: function() {
         $cordovaPushV5.initialize(this.options).then((function() {
            // Start listening
            $cordovaPushV5.onNotification();
            $cordovaPushV5.onError();

            $cordovaPushV5.register().then((function(tokenID) {
               this.createToken(tokenID);
               this.token = tokenID;
            }).bind(this));
         }).bind(this));

         $rootScope.$on('$cordovaPushV5:notificationReceived', (function(event, data) {
            this[data.additionalData.subject](data);
            console.log("Recieved push", data);
            $cordovaPushV5.finish(); //for iOS
         }).bind(this));
         $rootScope.$on('$cordovaPushV5:errorOcurred', (function(event, e) {
            console.error(e);
         }).bind(this));
      },

      createToken: function(token) {
         console.log('createToken', token);
         return $http.post(server+'/v1/users/tokens', {userId: $rootScope.currentUserId, token: token, tokenType: "iOS"}, Auth.getHeaderObject());
      },

      removeToken: function() {
         if(this.token == "") return;
         console.log('removeToken', this.token);
         return $http.delete(server+'/v1/users/tokens/'+this.token, Auth.getHeaderObject());
      },

      /** For handle functions see CloudMessageSubject **/
      // CloudMessageSubject.NEWMESSAGE
      NewMessage: function(data) {
         chatId = data.additionalData[CloudMessageSubject.NEWMESSAGE_CHATID];

         // Check if notification was recieved while app was in foreground
         //alert("Recieved new message on foreground");


         if(data.additionalData.foreground){
            if($state.current.name == "app.chatmessages" && $stateParams.chatId == chatId){
                $rootScope.loadMessages();
            }else{
                User.getById(data.additionalData[CloudMessageSubject.NEWMESSAGE_SENDERID]).then(function(resp){
                    var msg = data.message;
                    var tmp = msg.split(" ");
                    if(tmp.length > 0){
                        msg = msg.replace(tmp[0]+": ","");
                    }
                    $rootScope.showNotification(data.additionalData[CloudMessageSubject.NEWMESSAGE_SENDER], msg, resp.data.image.lowRes);
                });
            }
         }else{
            $state.go('app.chatmessages', {chatId: chatId});
         }

      },

      // CloudMessageSubject.DESIRECOMPLETE
      DesireComplete: function(data) {
         desireId = data.additionalData[CloudMessageSubject.DESIRECOMPLETE_DESIREID];

         if(data.additionalData.foreground){
            if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                $state.go($state.current, {}, {reload: true});
            }else{
                Desire.getDetail(desireId).then(function(resp){
                    var msg = data.message;
                    var tmp = msg.split(" ");
                    var header = "";
                    if(tmp.length > 0){
                        header = tmp[0];
                        msg = msg.replace(tmp[0]+": ","");
                    }
                    $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                });
            }
         }else {
             $state.go('app.desiredetail', {desireId: desireId});
         }
      },

      // CloudMessageSubject.HAVERACCEPTED
      HaverAccepted: function(data) {
         desireId = data.additionalData[CloudMessageSubject.HAVERACCEPTED_DESIREID];

          if(data.additionalData.foreground){
              if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                  $state.go($state.current, {}, {reload: true});
              }else{
                  Desire.getDetail(desireId).then(function(resp){
                      var msg = data.message;
                      var tmp = msg.split(" ");
                      var header = "";
                      if(tmp.length > 0){
                          header = tmp[0];
                          msg = msg.replace(tmp[0]+": ","");
                      }
                      $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                  });
              }
          }else {
              $state.go('app.desiredetail', {desireId: desireId});
          }
      },

      // CloudMessageSubject.HAVERREJECTED
      HaverRejected: function(data) {
         desireId = data.additionalData[CloudMessageSubject.HAVERREJECTED_DESIREID];

          if(data.additionalData.foreground){
              if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                  $state.go($state.current, {}, {reload: true});
              }else{
                  Desire.getDetail(desireId).then(function(resp){
                      var msg = data.message;
                      var tmp = msg.split(" ");
                      var header = "";
                      if(tmp.length > 0){
                          header = tmp[0];
                          msg = msg.replace(tmp[0]+": ","");
                      }
                      $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                  });
              }
          }else {
              $state.go('app.desiredetail', {desireId: desireId});
          }
      },

      // CloudMessageSubject.NEWHAVER
      NewHaver: function(data) {
         desireId = data.additionalData[CloudMessageSubject.NEWHAVER_DESIREID];

          if(data.additionalData.foreground){
              if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                  $state.go($state.current, {}, {reload: true});
              }else{
                  Desire.getDetail(desireId).then(function(resp){
                      var msg = data.message;
                      var tmp = msg.split(" ");
                      var header = "";
                      if(tmp.length > 0){
                          header = tmp[0];
                          msg = msg.replace(tmp[0]+": ","");
                      }
                      $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                  });
              }
          }else {
              $state.go('app.desiredetail', {desireId: desireId});
          }
      },

      // CloudMessageSubject.HAVERUNACCEPTED
      HaverUnaccepted: function(data) {
         desireId = data.additionalData[CloudMessageSubject.HAVERUNACCEPTED_DESIREID];

          if(data.additionalData.foreground){
              if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                  $state.go($state.current, {}, {reload: true});
              }else{
                  Desire.getDetail(desireId).then(function(resp){
                      var msg = data.message;
                      var tmp = msg.split(" ");
                      var header = "";
                      if(tmp.length > 0){
                          header = tmp[0];
                          msg = msg.replace(tmp[0]+": ","");
                      }
                      $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                  });
              }
          }else {
              $state.go('app.desiredetail', {desireId: desireId});
          }
      },

      // CloudMessageSubject.HAVERUNACCEPTED
      HaverUnaccepted: function(data) {
         desireId = data.additionalData[CloudMessageSubject.WANTERUNACCEPTED_DESIREID];

          if(data.additionalData.foreground){
              if($state.current.name == "app.desiredetail" && $stateParams.desireId == desireId){
                  $state.go($state.current, {}, {reload: true});
              }else{
                  Desire.getDetail(desireId).then(function(resp){
                      var msg = data.message;
                      var tmp = msg.split(" ");
                      var header = "";
                      if(tmp.length > 0){
                          header = tmp[0];
                          msg = msg.replace(tmp[0]+": ","");
                      }
                      $rootScope.showNotification(header, msg, resp.data.image.lowRes);
                  });
              }
          }else {
              $state.go('app.desiredetail', {desireId: desireId});
          }
      },

   };
}]);

controllers.controller('ChatMessagesCtrl', function($scope, $rootScope, Chat, User, $stateParams, $ionicScrollDelegate) {
    $scope.messages = [];

    window.addEventListener('native.keyboardshow', function(){
        document.body.scrollTop = 0;
        cordova.plugins.Keyboard.disableScroll(true);
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
    });
    window.addEventListener('native.keyboardhide', function(){
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
    });

    $scope.$on('$ionicView.enter', function() {
        document.body.scrollTop = 0;
        cordova.plugins.Keyboard.disableScroll(true);
        $scope.pollMessages(true);
    });

    $scope.loadMore = function(){
        $scope.pollMessages(false);
    }

   $rootScope.loadMessages = function(){
      Chat.getMessagesByChatId($stateParams.chatId, undefined).then(function(resp){
          $scope.messages = resp.data.reverse();
          $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
      });
   }

    /*
    $scope.$on('$ionicView.enter', function() {
        cordova.plugins.Keyboard.disableScroll(true);
    });

    $scope.$on('$ionicView.leave', function() {
        cordova.plugins.Keyboard.disableScroll(false);
    });*/

    $scope.pollMessages = function(jumpBottom){
        console.log($stateParams.chatId)
        var lastId = undefined;
        if($scope.messages.length > 0){
            lastId = $scope.messages[0].createdAt;
        }
        Chat.getMessagesByChatId($stateParams.chatId, lastId).then(function(resp){
            $scope.$broadcast('scroll.refreshComplete');
            $scope.messages = resp.data.reverse().concat($scope.messages);
            if(jumpBottom){
                $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
            }
        });

        Chat.getOtherUserByChatId($stateParams.chatId).then(function(resp){
            $scope.otherUser = resp.data;
        });
    }


    $scope.sendMsg = function(msg){
        if(msg == undefined || msg.length == 0 || msg.replace(/ /g,"").length == 0){
            return;
        }
        var newMsg = {from: $rootScope.currentUser.id, body: msg, sending:true, objectId: new Date()};
        $scope.messages.push(newMsg);
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
        $scope.msg = "";
        Chat.sendMessage($stateParams.chatId, msg).then(function(resp){
            newMsg.sending = false;
        });
    }

})

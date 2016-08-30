controllers.controller('ChatMessagesCtrl', function($scope, $rootScope, Chat, User, $stateParams, $ionicScrollDelegate, Focus) {
    $scope.messages = [];

    window.addEventListener('native.keyboardshow', function(){
        Focus("input");
        console.log("show");
    });

    $scope.$on('$ionicView.enter', function() {
        $scope.pollMessages(true);
    });

    $scope.loadMore = function(){
        $scope.pollMessages(false);
    }

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
                //$ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
            }
        });

        Chat.getOtherUserByChatId($stateParams.chatId).then(function(resp){
            $scope.otherUser = resp.data;
        });
    }


    $scope.sendMsg = function(msg){
        
        var newMsg = {from: $rootScope.currentUser.id, body: msg, sending:true, objectId: new Date()};
        $scope.messages.push(newMsg);
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
        $scope.msg = "";
        Chat.sendMessage($stateParams.chatId, msg).then(function(resp){
            //newMsg.sending = false;
        });
    }

})
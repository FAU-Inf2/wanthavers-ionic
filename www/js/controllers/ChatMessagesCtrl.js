controllers.controller('ChatMessagesCtrl', function($scope, $rootScope, Chat, User, $stateParams, $ionicScrollDelegate) {
    $scope.messages = [];

    $scope.$on('$ionicView.enter', function() {
        console.log($rootScope.currentUser);
        $scope.pollMessages(true);

    });

    $scope.loadMore = function(){
        $scope.pollMessages(false);
    }

    $scope.pollMessages = function(jumpBottom){
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
            for(var i=0;i<resp.data.length;i++){
                if(resp.data[i].from != $rootScope.currentUser.id){
                    User.getById(resp.data[i].from).then(function(resp){
                        $scope.otherUser = resp.data;
                    });
                    break;
                }
            }
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
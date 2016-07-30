controllers.controller('ChatMessagesCtrl', function($scope, $rootScope, Chat, User, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function() {
        console.log($rootScope.currentUser);
        $scope.pollMessages();

    });

    $scope.pollMessages = function(){
        Chat.getMessagesByChatId($stateParams.chatId).then(function(resp){
            $scope.messages = resp.data;
            $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
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
        
        var newMsg = {from: $rootScope.currentUser.id, body: msg, sending:true};
        $scope.messages.push(newMsg);
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
        $scope.msg = "";
        Chat.sendMessage($stateParams.chatId, msg).then(function(resp){
            //newMsg.sending = false;
        });
    }

})
controllers.controller('ChatMessagesCtrl', function($scope, $rootScope, Chat, User, $stateParams, $ionicScrollDelegate, $ionicActionSheet, $translate, $ionicPopup) {
    $scope.messages = [];

    $translate('CANCEL').then(function (translation) {
        $scope.CANCEL = translation;
    });

    $translate('FLAG_USER').then(function (translation) {
        $scope.FLAG_USER = translation;
    });

    $translate('FLAG_USER_CONFIRM').then(function (translation) {
        $scope.FLAG_USER_CONFIRM = translation;
    });

    $scope.$parent.addButtons([
        {
            icon: "ion-ios-more",
            name: "",
            show: true,
            action: function(){
                var btns = [{ text: $scope.FLAG_USER }];

                var options = {
                    buttons: [],
                    destructiveText: $scope.FLAG_USER,
                    titleText: '',
                    cancelText: $scope.CANCEL,
                    cancel: function() {
                        return true;
                    },
                    buttonClicked: function(index) {
                        return true;
                    },
                    destructiveButtonClicked: function(){
                        $scope.blockUserConfirm();
                        return true;
                    }
                };

                $ionicActionSheet.show(options);
            }
        }
    ]);

    $scope.blockUserConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title:  $scope.FLAG_USER,
            template: $scope.FLAG_USER_CONFIRM
        });

        confirmPopup.then(function(res) {
            if(res) {
                User.block($scope.otherUser.id);
            } else {
                //nothing
            }
        });
    }

    window.addEventListener('native.keyboardshow', function(){
        document.body.scrollTop = 0;
        cordova.plugins.Keyboard.disableScroll(true);
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
    });
    window.addEventListener('native.keyboardhide', function(){
        $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
    });

    $rootScope.loadMessages = function(){
        Chat.getMessagesByChatId($stateParams.chatId, undefined).then(function(resp){
            $scope.messages = resp.data.reverse();
            $ionicScrollDelegate.$getByHandle('msgList').scrollBottom();
        });


    }

    $scope.$on('$ionicView.enter', function() {
        document.body.scrollTop = 0;
        if(typeof(cordova) != "undefined"){
            cordova.plugins.Keyboard.disableScroll(true);
        }
        $rootScope.loadMessages();

        Chat.getOtherUserByChatId($stateParams.chatId).then(function(resp){
            $scope.otherUser = resp.data;
        });
    });

    $scope.loadMore = function(){
        $scope.pollMessages(false);
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

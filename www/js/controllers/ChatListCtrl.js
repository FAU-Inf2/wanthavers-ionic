controllers.controller('ChatListCtrl', function($scope, Chat) {

    Chat.list().then(function(resp){
        $scope.feed = resp.data;
        for (var i = 0; i < $scope.feed.length; i++) {
            $scope.feed[i].otherUser = Chat.getOtherUser($scope.feed[i]);
        }
    });

})
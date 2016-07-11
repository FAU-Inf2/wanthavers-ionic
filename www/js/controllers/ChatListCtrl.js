controllers.controller('ChatListCtrl', function($scope, Chat) {

    Chat.list().then(function(resp){
        $scope.feed = resp.data;
    });
})
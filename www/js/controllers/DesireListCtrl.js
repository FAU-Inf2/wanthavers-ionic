controllers.controller('DesireListCtrl', function($scope, Desire, $state, $ionicViewService, $ionicNavBarDelegate) {

    $scope.$on('$ionicView.enter', function() {
    });

    Desire.list().then(function(resp){
        $scope.feed = resp.data;
    });


    $scope.$parent.addButtons([{
        icon: "ion-chatbubbles",
        name: "",
        action: function(){
            $state.go("app.chatlist");
        }
    }]);


})
controllers.controller('DesireListCtrl', function($scope, Desire, $state, $ionicViewService, $ionicNavBarDelegate) {

    $scope.$on('$ionicView.enter', function() {
    });

    $scope.loadDesires = function(){
        Desire.list().then(function(resp){
            $scope.feed = resp.data;
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.$parent.addButtons([{
        icon: "ion-android-funnel",
        name: "",
        action: function(){
            $state.go("app.filtersetting");
        }
    },
    {
        icon: "ion-chatbubbles",
        name: "",
        action: function(){
            $state.go("app.chatlist");
        }
    }]);

    $scope.loadDesires();
})
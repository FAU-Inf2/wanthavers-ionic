controllers.controller('DesireListCtrl', function($scope, Desire, $state, Location, $ionicSideMenuDelegate) {

    $ionicSideMenuDelegate.canDragContent(true);

    $scope.$on('$ionicView.enter', function() {
        $scope.location = "wanthaver";
        navigator.geolocation.getCurrentPosition(function(pos){
            console.log(pos);
            Location.getLocationByCoords(pos.coords.latitude, pos.coords.longitude).then(function(resp){
                $scope.location = resp.data.cityName;
            });
        });

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
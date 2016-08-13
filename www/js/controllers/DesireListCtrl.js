controllers.controller('DesireListCtrl', function($scope, Desire, $state, Location, $ionicSideMenuDelegate, $ionicModal, $rootScope) {

    $scope.reachedEnd = false;

    $ionicSideMenuDelegate.canDragContent(true);

    $scope.$on('$ionicView.enter', function() {
        $scope.location = "wanthaver";
        ionic.Platform.ready(function(){
            navigator.geolocation.getCurrentPosition(function(pos){
                $rootScope.currentPosition = pos.coords;
                Location.getLocationByCoords(pos.coords.latitude, pos.coords.longitude).then(function(resp){
                    $scope.location = resp.data.cityName;
                });
            }, function(error){});
        });


    });


    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (fromState.url == "/filtersetting") {
            $scope.loadDesires();
        }
    })

    /** infinite scroll **/
    $scope.loadMore = function(){
        if($scope.feed == undefined || $scope.reachedEnd){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        var last = $scope.feed[$scope.feed.length - 1];
        Desire.list(last.id).then(function(resp){
            if(resp.data.length == 0){
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.reachedEnd = true;
                return;
            }
            $scope.feed = $scope.feed.concat(resp.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /** refresh **/
    $scope.loadDesires = function(){
        Desire.list(undefined).then(function(resp){
            $scope.feed = resp.data;
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
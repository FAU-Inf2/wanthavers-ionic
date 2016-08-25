controllers.controller('DesireListCtrl', function($scope, Desire, $state, Location, $ionicSideMenuDelegate, $ionicModal, $rootScope, $translate, $stateParams, Auth) {

    $scope.reachedEnd = false;
    $scope.obj = {};
    $scope.obj.location = "";

    $ionicSideMenuDelegate.canDragContent(true);

    $scope.$on('$ionicView.enter', function() {
        if($stateParams.mode == "my"){
            $scope.reachedEnd = false;
            $translate('MENU_MY_DESIRE').then(function (translation) {
                $scope.obj.location = translation;
            });
           /*} else if($stateParams.mode == "haver"){
            $scope.reachedEnd = false;
            $translate('MENU_MY_TRANSACTIONS').then(function (translation) {
                $scope.obj.location = translation;
            });*/
        }else{
            $scope.reachedEnd = false;
            if($rootScope.currentPosition == undefined){
                $scope.obj.location = "";
            }
            ionic.Platform.ready(function(){
                navigator.geolocation.getCurrentPosition(function(pos){
                    $rootScope.currentPosition = pos.coords;
                    Location.getLocationByCoords(pos.coords.latitude, pos.coords.longitude).then(function(resp){
                        $scope.obj.location = resp.data.cityName;
                    });
                }, function(error){});
            });
        }

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
        Desire.list(last.id, $stateParams.mode, Auth.getUserId()).then(function(resp){
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
        Desire.list(undefined, $stateParams.mode, Auth.getUserId()).then(function(resp){
            if(resp.data.length == 0){
                $scope.reachedEnd = true;
            }
            $scope.feed = resp.data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.$parent.addButtons([{
        icon: "ion-android-funnel",
        name: "",
        show: true,
        action: function(){
            $state.go("app.filtersetting");
        }
    },
    {
        icon: "ion-chatbubbles",
        name: "",
        show: true,
        action: function(){
            $state.go("app.chatlist");
        }
    }]);



    $scope.loadDesires();
})
controllers.controller('DesireListCtrl', function($scope, Desire, $state, Location, $ionicSideMenuDelegate, FilterSetting, $ionicModal, $rootScope, $translate, $stateParams, Auth, $timeout, $ionicLoading, $ionicPopup, $ionicPlatform, PushNotifications) {

    $scope.reachedEnd = false;
    $scope.obj = {};
    $scope.obj.location = "";
    $scope.showLoadingAnimation = false;
    $scope.isMy = false;

    $ionicSideMenuDelegate.canDragContent(true);

    //$scope.$on('$ionicView.enter',

    $scope.init = function() {

        $scope.showLoading();

        if($stateParams.mode == "my"){
            $scope.reachedEnd = false;
            FilterSetting.resetFilter();
            $scope.loadDesires();

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
                $scope.getPosition(true)
            }else{
                $scope.loadDesires();
                $scope.getPosition();
            }
        }
    }

    $scope.$on('$ionicView.enter', function () {
        if($stateParams.mode == "my"){
            $scope.isMy = true;
            $scope.init();
        }else{
            $scope.isMy = false;
        }
    });

    $scope.$on('$ionicView.afterEnter', function () {
        PushNotifications.registerToken();
    });

    $scope.getPosition = function(loadDesires){
        $rootScope.cordovaReady(function() {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos.coords.lat);
                $rootScope.currentPosition = pos.coords;
                if (loadDesires) {
                    $scope.loadDesires();
                }

                Location.getLocationByCoords(pos.coords.latitude, pos.coords.longitude).then(function (resp) {
                    $timeout(function () {
                        $scope.obj.location = resp.data.cityName;
                    }, 2000);
                });
            }, function (error) {
                console.log(error)
                $scope.loadDesires();
                $ionicPopup.alert({
                    title: 'Location Error',
                    template: 'Could not get your location, please allow access to your location to show desires nearby.'
                });

            });
        });
    }


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
            $scope.hideLoading();
        });
    }

    $scope.$parent.addButtons([{
        icon: "ion-ios-settings-strong",
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

    $scope.showLoading = function(){
        $scope.showLoadingAnimation = true;
    }

    $scope.hideLoading = function(){
        $scope.showLoadingAnimation = false;
    }


    /** INIT **/

    $scope.init();


})

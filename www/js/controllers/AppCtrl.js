controllers.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $state, User, Auth) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.barButtonsMap = [];
    $scope.barButtons = [];

    $scope.addButtons = function(arr){
        var tmp = $scope.barButtonsMap[$state.current.name];
        if(tmp != undefined){
            return;
        }
        $scope.barButtonsMap[$state.current.name] = arr
    }

    $scope.refreshButtons = function(){
        var tmp = $scope.barButtonsMap[$state.current.name];
        $scope.barButtonsMap[$state.current.name] = [];
        $scope.barButtonsMap[$state.current.name] = tmp;
    }

    $scope.removeButtons = function() {
        var tmp = $scope.barButtonsMap[$state.current.name];
        if(tmp != undefined){
            return;
        }
        $scope.barButtonsMap[$state.current.name] = [];
    }

    $scope.$on('$ionicView.enter', function() {
        $rootScope.currentUserId = Auth.getUserId();
        if($rootScope.currentUser == undefined){
            User.getCurrentUser().then(function(resp){
               $rootScope.currentUser = resp.data;
            });
        }
    });

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
        if(data.stateName == undefined)
            return;
        $scope.barButtons = $scope.barButtonsMap[data.stateName];
    });


})
controllers.controller('AppCtrl', function($scope, $ionicModal, $state, User) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.barButtonsMap = [];
    $scope.barButtons = [];

    $scope.addButtons = function(arr){
        //icon: "ion-chatbubbles", name: "test", action: function
        var tmp = $scope.barButtonsMap[$state.current.name];
        if(tmp != undefined){
            return;
        }
        $scope.barButtonsMap[$state.current.name] = arr

    }

    $scope.$on('$ionicView.enter', function() {

       //check login
        User.getCurrentUser().success(function(data){
           console.log(data)
           $scope.currentUser = data;
        }).error(function(resp){
            $state.go("app.login");
        });
    });

    $scope.test = function(){
        console.log($state.currentUser);
    }

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
        if(data.stateName == undefined)
            return;
        $scope.barButtons = $scope.barButtonsMap[data.stateName];
    });


})
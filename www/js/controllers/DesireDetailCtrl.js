controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $stateParams, Desire, Haver, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });
    
    Desire.getDetail($stateParams.desireId).then(function(resp){
        $scope.desire = resp.data;
        $scope.isWanter = $scope.desire.creator.id == $rootScope.currentUserId;
        $ionicLoading.hide();
    });

    Haver.getAllHavers($stateParams.desireId).then(function(resp) {
        $scope.list = resp.data;
    });

    $scope.$on('$ionicView.enter', function() {

    });

    $scope.cancel = function(){
        //bbbb
    }

    $scope.$parent.addButtons([
        {
            icon: "ion-android-cancel",
            name: "",
            show: false,
            action: function(){
                $scope.cancel();
            }
        },
        {
            icon: "ion-checkmark-round",
            name: "",
            action: function(){
                alert(1);
            }
        }
    ]);
})

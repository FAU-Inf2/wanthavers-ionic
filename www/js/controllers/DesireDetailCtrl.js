controllers.controller('DesireDetailCtrl', function($scope, $stateParams, Desire, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });
    
    Desire.getDetail($stateParams.desireId).then(function(resp){
        $scope.desire = resp.data;
        $ionicLoading.hide();
    });

    $scope.$on('$ionicView.enter', function() {

        if($scope.currentUser.id == $scope.desire.creator.id) {
            $scope.userIsCreator = true;
        } else {
            $scope.userIsCreator = false;
        }
    });

    $scope.$parent.addButtons([
        {
            icon: "ion-android-cancel",
            name: "",
            show: false,
            action: function(){
                $state.go("app.browse");
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

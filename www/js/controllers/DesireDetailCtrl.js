controllers.controller('DesireDetailCtrl', function($scope, $stateParams, Desire, $state) {
    Desire.getDetail($stateParams.desireId).then(function(resp){
        $scope.desire = resp.data;
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

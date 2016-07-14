controllers.controller('DesireDetailCtrl', function($scope, $stateParams, Desire, $state) {
    Desire.getDetail($stateParams.desireId).then(function(resp){
        $scope.desire = resp.data;
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
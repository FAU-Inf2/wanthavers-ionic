controllers.controller('DesireDetailCtrl', function($scope, $stateParams, Desire) {
    Desire.getDetail($stateParams.desireId).then(function(resp){
        $scope.desire = resp.data;
    });
})
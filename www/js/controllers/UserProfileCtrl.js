controllers.controller('UserProfileCtrl', function($rootScope, $scope, $stateParams, $ionicHistory, $translate,
                                                   Desire) {


    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.user = $stateParams.user;

        $scope.getSuccessfulDesires();
        $scope.getCanceledDesires();
        $scope.loadUsersDesires();

    });

    $scope.getSuccessfulDesires = function(){
        Desire.getSuccessfulDesires($scope.user.id).then(function(resp){
            $scope.user.successfulDesires = resp.data.length;
        });
    };


    $scope.getCanceledDesires = function(){
       Desire.getCanceledDesires($scope.user.id).then(function(resp){
            $scope.user.canceledDesires = resp.data.length;
        });
    };

    $scope.loadUsersDesires = function () {
        Desire.getDesireByUserId($scope.user.id).then(function(resp){
            $scope.desires = $scope.desires.concat(resp.data);
        });

    }

})
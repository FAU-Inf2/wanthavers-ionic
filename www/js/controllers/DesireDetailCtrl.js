controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $stateParams, Desire, Haver, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.$parent.removeButtons();

    Desire.getDetail($stateParams.desireId).then(function (resp) {
        $scope.desire = resp.data;
        $scope.isWanter = $scope.desire.creator.id == $rootScope.currentUserId;
        console.log( $scope.desire.creator.id)
        console.log($rootScope.currentUserId)
        console.log($scope.isWanter);
        $scope.canRate = ($scope.isWanter && !$scope.desire.creatorHasRated && ($scope.desire.status == 3));
        $scope.showNavBarButtons();
        //$scope.refreshButtons();
        $ionicLoading.hide();
    });

    Haver.getAllHavers($stateParams.desireId).then(function(resp) {
        $scope.list = resp.data;
    });

    $scope.$on('$ionicView.enter', function() {


    });

    $scope.removeDesire = function(){
        //bbbb
    }

    $scope.reportDesire = function() {

    }

    $scope.acceptDesire = function() {
        Haver.createHaver($stateParams.desireId);
    }

    $scope.acceptHaver = function(haver) {
        console.log($scope.desire.id)
        console.log(haver.id)
        Haver.updateHaverStatus($scope.desire.id, haver.id, 1);
    }

    $scope.showNavBarButtons = function() {

        $scope.$parent.addButtons([
            {
                icon: "icon ion-trash-b myBtn",
                name: "",
                show: $scope.isWanter,
                action: function(){
                    $scope.removeDesire();
                }
            },
            {
                icon: "icon ion-alert-circled",
                name: "",
                show: !($scope.isWanter),
                action: function() {
                    $scope.reportDesire();
                }
            },
            {
                icon: "icon ion-checkmark-round",
                name: "",
                show: !($scope.isWanter),
                action: function(){
                    $scope.acceptDesire();
                }
            }
        ]);
    }


})

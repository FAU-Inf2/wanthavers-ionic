controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $stateParams, Desire, Haver, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    Desire.getDetail($stateParams.desireId).then(function (resp) {
        $scope.desire = resp.data;
        $scope.isWanter = $scope.desire.creator.id == $rootScope.currentUserId;
        $scope.showNavBarButtons();
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
        User.getById($rootScope.currentUser.id).then(function(resp){
            $scope.currentUser = resp.data;
        });
        var appDate = $filter('date')(app.date, "dd/MM/yyyy");
        haver = new Haver($scope.currentUser, appDate, $scope.desire.id);

    }

    $scope.showNavBarButtons = function() {
        $scope.$parent.addButtons([
            {
                icon: "icon ion-trash-b",
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

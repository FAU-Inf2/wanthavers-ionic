controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $stateParams, Desire, Haver, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.$parent.removeButtons();

    Desire.getDetail($stateParams.desireId).then(function (resp) {
        $scope.desire = resp.data;
        $scope.isWanter = $scope.desire.creator.id == $rootScope.currentUserId;
        $scope.showList = $scope.isWanter && ($scope.desire.status == 1);

        console.log( $scope.desire.creator.id)
        console.log($rootScope.currentUserId)
        console.log($scope.isWanter);
        $scope.canRate = ($scope.isWanter && !$scope.desire.creatorHasRated && ($scope.desire.status == 3));
        $scope.desireOpen = ($scope.desire.status == 1);
        $scope.desireInProgress = ($scope.desire.status == 2);
        $scope.desireDone = ($scope.desire.status == 3);
        $scope.showAcceptedHaver = ($scope.isWanter && ($scope.desireInProgress || $scope.desireDone));
        $scope.showNavBarButtons();
        $ionicLoading.hide();
        console.log("detail");
    });

    Haver.getAllHavers($stateParams.desireId).then(function(resp) {
        $scope.list = resp.data;
        for (var i=0; i<$scope.list.length; i++) {
            if ($scope.list[i].user.id == $rootScope.currentUserId) {
                $scope.isHaver = true;
                $scope.$parent.refreshButtons();
                return;
            }
        }
        $scope.isHaver = false;
        $scope.$parent.refreshButtons();
        console.log("getAll")

    });

    Haver.getAcceptedHaver($stateParams.desireId).then(function(resp) {
        $scope.acceptedHaver = resp.data;
    });

    $scope.$on('$ionicView.enter', function() {


    });

    $scope.removeDesire = function(){
        Desire.updateDesireStatus($stateParams.desireId, 0);
    }

    $scope.reportDesire = function() {

    }

    $scope.acceptDesire = function() {
        Haver.createHaver($stateParams.desireId);
    }

    $scope.acceptHaver = function(haver) {
        console.log($scope.desire.id);
        console.log(haver.user.id);
        Haver.updateHaverStatus($stateParams.desireId, haver.user.id, 1);
        //TODO: check this
        //$state.go($state.current, {}, {reload: true});
    }

    $scope.unacceptHaver = function() {

    }

    $scope.openChat = function(haver) {
        if ($scope.isWanter) {
            Desire.getChat($stateParams.desireId, haver.user.id).then(function(resp) {
                $state.go("app.chatmessages", {chatId: resp.data.id});
            });
        } else {
            Desire.getChat($stateParams.desireId, $scope.desire.creator.id).then(function(resp) {
                $state.go("app.chatmessages", {chatId: resp.data.id});
            });
        }

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
            },
            {
                icon: "icon ion-close-round",
                name: "",
                show: (($scope.desireInProgress || $scope.desireOpen) && $scope.isHaver),
                action: function(){
                    $scope.unacceptHaver();
                }
            }
        ]);
    }


})

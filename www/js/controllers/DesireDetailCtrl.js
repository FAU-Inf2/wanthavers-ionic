controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $ionicHistory, $stateParams, Desire, Haver, $state, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.$parent.removeButtons();

    Desire.getDetail($stateParams.desireId).then(function (resp) {
        $scope.desire = resp.data;
        $scope.desireOpen = ($scope.desire.status == 1);
        $scope.desireInProgress = ($scope.desire.status == 2);
        $scope.desireDone = ($scope.desire.status == 3);

        $scope.isWanter = $scope.desire.creator.id == $rootScope.currentUserId;
        $scope.showList = $scope.isWanter && $scope.desireOpen;
        $scope.canRate = ($scope.isWanter && !$scope.desire.creatorHasRated && $scope.desireDone);
        $scope.showAcceptedHaver = ($scope.isWanter && ($scope.desireInProgress || $scope.desireDone));
        console.log("detail");
    });

    Haver.getAllHavers($stateParams.desireId).then(function(resp) {
        $scope.list = resp.data;
        for (var i=0; i<$scope.list.length; i++) {
            if ($scope.list[i].user.id == $rootScope.currentUserId) {
                $scope.isHaver = true;
                $scope.$parent.refreshButtons();
                console.log("getAll: isHaver");
                return;
            }
        }
        $scope.isHaver = false;
        $scope.$parent.refreshButtons();
        console.log("getAll")

    });

    Haver.getAcceptedHaver($stateParams.desireId).then(function(resp) {
        $scope.acceptedHaver = resp.data;
        console.log("getaccepted");
        $scope.showNavBarButtons();
        $ionicLoading.hide();
    });

    $scope.$on('$ionicView.enter', function() {

    });

    $scope.removeDesire = function(){
        Desire.updateDesireStatus($stateParams.desireId, 0);
        $ionicHistory.goBack();
    }

    $scope.reportDesire = function() {
        
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});
    }

    $scope.acceptDesire = function() {
        Haver.createHaver($stateParams.desireId);
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});
    }

    $scope.acceptHaver = function(haver) {
        console.log($scope.desire.id);
        console.log(haver.user.id);
        Haver.updateHaverStatus($stateParams.desireId, haver.user.id, 1);
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});

    }

    $scope.deleteHaver = function() {
        Haver.updateHaverStatus($stateParams.desireId, $rootScope.currentUserId,3);
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});
    }

    $scope.finishDesire = function() {
        Desire.updateDesireStatus($stateParams.desireId, 3);
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});
    }

    $scope.unacceptHaver = function() {
        Haver.updateHaverStatus($stateParams.desireId, $scope.acceptedHaver.user.id, 0);
        //TODO: reload correct???
        $state.go($state.current, {}, {reload: true});
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
                show: ($scope.isWanter && !$scope.desireDone),
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
                show: (!($scope.isWanter) && !($scope.isHaver) && $scope.desireOpen),
                action: function(){
                    $scope.acceptDesire();
                }
            },
            {
                icon: "icon ion-close-round",
                name: "",
                show: (($scope.desireInProgress || $scope.desireOpen) && $scope.isHaver),
                action: function(){
                    if ($scope.desireInProgress) {
                        $scope.unacceptHaver();
                        $scope.deleteHaver();
                    } else if ($scope.desireOpen) {
                        $scope.deleteHaver();
                    }
                }
            },
            {
                icon: "icon ion-checkmark-round",
                name: "",
                show: ($scope.isWanter && $scope.desireInProgress),
                action: function(){
                    $scope.finishDesire();
                }
            }
        ]);
    }


})
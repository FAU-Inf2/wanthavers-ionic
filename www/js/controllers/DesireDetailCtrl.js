controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $ionicHistory, $stateParams, Desire,
                                                    Haver, $state, $ionicLoading, $ionicPopup, $translate, $ionicPopover) {

    $ionicLoading.show({
        template: 'Loading...',
        delay: 1000
    });

    $scope.$parent.removeButtons();

    Desire.getDetail($stateParams.desireId).then(function (resp) {
        $scope.desire = resp.data;
        $scope.desireOpen = ($scope.desire.status == 1);
        $scope.desireInProgress = ($scope.desire.status == 2);
        $scope.desireDone = ($scope.desire.status == 3);

        $scope.isWanter = ($scope.desire.creator.id == $rootScope.currentUserId);
        $scope.showList = $scope.isWanter && $scope.desireOpen;
        $scope.wanterCanRate = ($scope.isWanter && !$scope.desire.creatorHasRated && $scope.desireDone);
        $scope.showAcceptedHaver = ($scope.isWanter && ($scope.desireInProgress || $scope.desireDone));
        console.log("wanterCanRate = " + $scope.wanterCanRate);
        console.log("showList: " + $scope.desireOpen)
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
        console.log($scope.acceptedHaver);
        if ($scope.desireInProgress || $scope.desireDone) {
            $scope.isAcceptedHaver = ($scope.acceptedHaver.user.id == $rootScope.currentUserId);
            $scope.haverCanRate = ($scope.isAcceptedHaver && !$scope.desire.haverHasRated && $scope.desireDone);
            console.log("haverCanRate = " + $scope.haverCanRate);
        }
        console.log("getaccepted");
        $scope.showNavBarButtons();
        console.log(($scope.desireInProgress || $scope.desireOpen) && $scope.isHaver);
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
                $state.go("app.chatmessages", {chatId: resp.data.objectId});
            });
        } else {
            Desire.getChat($stateParams.desireId, $scope.desire.creator.id).then(function(resp) {
                $state.go("app.chatmessages", {chatId: resp.data.objectId});
            });
        }

    }

    $translate('DESIRE_DETAIL_REPORT_REASON_1').then(function (translation) {
        $scope.reportReason1 = translation;
    });

    $translate('DESIRE_DETAIL_REPORT_REASON_2').then(function (translation) {
        $scope.reportReason2 = translation;
    });

    $translate('DESIRE_DETAIL_REPORT_REASON_3').then(function (translation) {
        $scope.reportReason3 = translation;
    });

    $scope.openRating = function(desire, haver) {
        $state.go("app.rating", {desire: desire, haver: haver});
    }

    $ionicPopover.fromTemplateUrl('templates/report.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.submitReport = function() {
        var sel = document.getElementById('scripts');
        var opt;
        for ( var i = 0, len = sel.options.length; i < len; i++ ) {
            opt = sel.options[i];
            if ( opt.selected === true ) {
                break;
            }
        }
        console.log(opt.value);
        console.log(document.getElementById('reportcomment').value);
        //TODO
        Desire.flagDesire($stateParams.desireId, opt.value);
        $scope.closePopover();
    }

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    $translate('DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_TITLE').then(function (translation) {
        $scope.wanterUnacceptPopupTitle = translation;
    });

    $translate('DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_SUBTITLE').then(function (translation) {
        $scope.wanterUnacceptPopupSubtitle = translation;
    });

    $scope.showWanterUnacceptPopup = function() {
        var confirmPopup = $ionicPopup.confirm({
            title:  $scope.wanterUnacceptPopupTitle,
            template: $scope.wanterUnacceptPopupSubtitle
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.unacceptHaver();
            } else {
                //nothing
            }
        });
    }

    $translate('DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_TITLE').then(function (translation) {
        $scope.haverUnacceptPopupTitle = translation;
    });

    $translate('DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_SUBTITLE').then(function (translation) {
        $scope.haverUnacceptPopupSubtitle = translation;
    });

    $translate('DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_WARNING').then(function (translation) {
        $scope.haverUnacceptPopupWarning = translation;
    });

    $scope.showHaverUnacceptPopup = function() {

        var confirmPopup;
        if ($scope.desireInProgress) {
            confirmPopup = $ionicPopup.confirm({
                title:  $scope.haverUnacceptPopupTitle,
                template: $scope.haverUnacceptPopupWarning
            });
        } else if ($scope.desireOpen) {
            confirmPopup = $ionicPopup.confirm({
                title:  $scope.haverUnacceptPopupTitle,
                template: $scope.haverUnacceptPopupSubtitle
            });
        } else {
            return;
        }

        confirmPopup.then(function(res) {
            if(res) {
                if ($scope.desireInProgress) {
                    $scope.unacceptHaver();
                    $scope.deleteHaver();
                } else if ($scope.desireOpen) {
                    $scope.deleteHaver();
                }
            } else {
                //nothing
            }
        });

    };

    $translate('DESIRE_DETAIL_DELETION_POPUP_TITLE').then(function (translation) {
        $scope.deletionPopupTitle = translation;
    });

    $translate('DESIRE_DETAIL_DELETION_POPUP_SUBTITLE').then(function (translation) {
        $scope.deletionPopupSubtitle = translation;
    });

    $scope.showDeletionPopup = function() {

        var confirmPopup = $ionicPopup.confirm({
            title:  $scope.deletionPopupTitle,
            template: $scope.deletionPopupSubtitle
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.removeDesire();
                $state.go("app.desirelist");
            } else {
                //nothing
            }
        });

    };

    $scope.showNavBarButtons = function() {

        $scope.$parent.addButtons([
            {
                icon: "icon ion-trash-b myBtn",
                name: "",
                show: ($scope.isWanter && !$scope.desireDone),
                action: function(){
                    $scope.showDeletionPopup();
                }
            },
            {
                icon: "icon ion-alert-circled",
                name: "",
                show: !($scope.isWanter),
                action: function() {
                    $scope.openPopover(null);
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
                    $scope.showHaverUnacceptPopup();
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

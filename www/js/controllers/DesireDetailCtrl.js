controllers.controller('DesireDetailCtrl', function($scope, $rootScope, $ionicHistory, $stateParams, Desire,
                                                    Haver, $state, $ionicLoading, $ionicPopup, $translate, $ionicPopover, $ionicActionSheet, $timeout) {

    $scope.DESIRE_DETAIL_REPORT_TITLE = "";
    $scope.DESIRE_DETAIL_RATE_WANTER = "";
    $scope.CANCEL = "";
    $scope.DESIRE_DETAIL_DELETION_POPUP_TITLE = "";

    $ionicLoading.show({
        template: 'Loading...',
        delay: 1000
    });

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.isWanter = undefined;
        $scope.showList = undefined;
        $scope.wanterCanRate = undefined;
        $scope.showAcceptedHaver = undefined;
        $scope.desire = undefined;
        $scope.desireOpen = undefined;
        $scope.desireInProgress = undefined;
        $scope.desireDone = undefined;
        $scope.isHaver = undefined;
        $scope.bidder = undefined;
        $scope.isAcceptedHaver = undefined;
        $scope.haverCanRate = undefined;;
    });

    $translate('DESIRE_DETAIL_REPORT_TITLE').then(function (translation) {
        $scope.DESIRE_DETAIL_REPORT_TITLE = translation;
    });

    $translate('DESIRE_DETAIL_RATE_WANTER').then(function (translation) {
        $scope.DESIRE_DETAIL_RATE_WANTER = translation;
    });

    $translate('CANCEL').then(function (translation) {
        $scope.CANCEL = translation;
    });

    $translate('DESIRE_DETAIL_DELETION_POPUP_TITLE').then(function (translation) {
        $scope.DESIRE_DETAIL_DELETION_POPUP_TITLE = translation;
    });


    $scope.showAddress = function(){
        console.log($scope.desire.dropzone_lat)
        $rootScope.showMap($scope.desire.dropzone_lat, $scope.desire.dropzone_long);
    }

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
                $scope.bidder = $scope.list[i];
                console.log($scope.bidder);
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

    $scope.acceptDesire = function(bid) {
        Haver.createHaver($stateParams.desireId, bid).then(function(){
            $state.go($state.current, {}, {reload: true});
        });
    }

    $scope.acceptHaver = function(haver) {
        console.log($scope.desire.id);
        console.log(haver.user.id);
        Haver.updateHaverStatus($stateParams.desireId, haver.user.id, 1).then(function(){
            $state.go($state.current, {}, {reload: true});
        })

    }

    $translate('DESIRE_DETAIL_REV_BIDDING_MODIFY_TITLE').then(function (translation) {
        $scope.revBiddingModifyTitle = translation;
    });

    $scope.updateRequestedPrice = function() {
        $scope.data = {};

        var myPopup = $ionicPopup.show({
            template: '<input type="number" maxlength="3"  ng-model="data.bid" autofocus>',
            title: $scope.revBiddingModifyTitle,
            subTitle: $scope.revBiddingSubtitle,
            scope: $scope,
            buttons: [
                { text: $scope.cancelBid},
                {
                    text: $scope.submitBid,
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.bid) {
                            //don't allow the user to close unless he enters bid
                            e.preventDefault();
                        } else {
                            Haver.updateRequestedPrice($stateParams.desireId, $rootScope.currentUserId, $scope.data.bid);
                        }
                    }
                }
            ]
        });
    }

    $scope.deleteHaver = function() {
        Haver.updateHaverStatus($stateParams.desireId, $rootScope.currentUserId,3).then(function(){
            $state.go($state.current, {}, {reload: true});
        });
    }

    $scope.finishDesire = function() {
        Desire.updateDesireStatus($stateParams.desireId, 3).then(function(){
            $state.go($state.current, {}, {reload: true});
            $timeout(function(){
                $scope.openRating($scope.desire, $scope.acceptedHaver);
            }, 1500);
        });
    }

    $scope.unacceptHaver = function() {
        Haver.updateHaverStatus($stateParams.desireId, $scope.acceptedHaver.user.id, 0).then(function(){
            $state.go($state.current, {}, {reload: true});
        });
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

    $translate('DESIRE_DETAIL_REV_BIDDING_TITLE').then(function (translation) {
        $scope.revBiddingTitle = translation;
    });

    $translate('DESIRE_DETAIL_REV_BIDDING_SUBTITLE').then(function (translation) {
        $scope.revBiddingSubtitle = translation;
    });

    $translate('DESIRE_DETAIL_CANCEL').then(function (translation) {
        $scope.cancelBid = translation;
    });

    $translate('DESIRE_DETAIL_SUBMIT').then(function (translation) {
        $scope.submitBid = translation;
    });

    $scope.showBidPopup = function() {
        $scope.data = {};

        var myPopup = $ionicPopup.show({
            template: "<input maxlength='3' class=\"bid-popup-input\" type=\"tel\" ng-model=\"data.bid\" autofocus > <span class='escape-euro popup-currency'>{{desire.currency}}</span>",
            title: $scope.revBiddingTitle,
            subTitle: $scope.revBiddingSubtitle,
            scope: $scope,
            buttons: [
                { text: $scope.cancelBid},
                {
                    text: $scope.submitBid,
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.bid) {
                            //don't allow the user to close unless he enters bid
                            e.preventDefault();
                        } else {
                            $scope.acceptDesire($scope.data.bid);
                            //Haver.updateRequestedPrice($stateParams.desireId, $rootScope.currentUserId, $scope.data.bid);
                            console.log($scope.data.bid);
                        }
                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };

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
        var flagReason = opt.value;
        var comment = document.getElementById('reportcomment').value;
        Desire.flagDesire($stateParams.desireId, flagReason, comment);
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

    $scope.acceptDesireButton = function(){
        if ($scope.desire.biddingAllowed) {
            $scope.showBidPopup();
        } else {
            $scope.acceptDesire(0);
        }
    }

    $scope.showNavBarButtons = function() {

        var btns = [{ text: $scope.DESIRE_DETAIL_REPORT_TITLE }];

        if($scope.haverCanRate){
            btns.push({ text: $scope.DESIRE_DETAIL_RATE_WANTER });
        }

        var options = {
            buttons: btns,
            titleText: '',
            cancelText: $scope.CANCEL,
            cancel: function() {
                return true;
            },
            buttonClicked: function(index) {


                if(index == 0){
                    $scope.openPopover(null);
                }

                if(index == 1 ){
                    $scope.openRating($scope.desire, $scope.acceptedHaver);
                }

                return true;
            },
            destructiveButtonClicked: function(){
                $scope.showDeletionPopup();
                return true;
            }
        };

        if(($scope.isWanter && !$scope.desireDone)){
            options.destructiveText = $scope.DESIRE_DETAIL_DELETION_POPUP_TITLE;
        }

        $scope.$parent.addButtons([

            {
                icon: "ion-ios-more",
                name: "",
                show: true,
                action: function(){
                    $ionicActionSheet.show(options);
                }
            },

            /*
            {
                icon: "icon ion-trash-b myBtn",
                name: "",
                show: false, //($scope.isWanter && !$scope.desireDone),
                action: function(){
                    $scope.showDeletionPopup();
                }
            },
            {
                icon: "icon ion-alert-circled",
                name: "",
                show: false, // !($scope.isWanter),
                action: function() {  //DONE
                    $scope.openPopover(null);
                }
            },
            {
                icon: "",
                name: "Annehmen",
                show: false, //(!($scope.isWanter) && !($scope.isHaver) && $scope.desireOpen),
                action: function(){ //DONE
                    if ($scope.desire.biddingAllowed) {
                        $scope.showBidPopup();
                    } else {
                        $scope.acceptDesire(0);
                    }
                }
            },
            {
                icon: "icon ion-close-round",
                name: "",
                show: false, //(($scope.desireInProgress || $scope.desireOpen) && $scope.isHaver),
                action: function(){
                    $scope.showHaverUnacceptPopup(); //DONE
                }
            },
            {
                icon: "icon ion-checkmark-round",
                name: "",
                show: false, // ($scope.isWanter && $scope.desireInProgress),
                action: function(){
                    $scope.finishDesire();
                }
            }*/
        ]);
    }


})

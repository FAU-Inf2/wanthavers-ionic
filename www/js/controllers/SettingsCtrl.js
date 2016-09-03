controllers.controller('SettingsCtrl', function($scope, $rootScope, $state ,$ionicModal, $ionicHistory, $translate,
                                                $ionicPopup, $ionicLoading, User, Auth, Location) {
    $scope.user = {};
    $scope.locations = [];


    $translate('SETTINGS_PWRESET_POPUP_TITLE').then(function (translation) {
        $scope.pwresetPopupTitle = translation;
    });

    $translate('SETTINGS_PWRESET_POPUP_TEXT').then(function (translation) {
        $scope.pwresetPopupText = translation;
    });

    $translate('SETTINGS_PWRESET_POPUP_TEXT_FAILED').then(function (translation) {
        $scope.pwresetPopupTextFailed = translation;
    });

    $translate('SETTINGS_SAVE_POPUPSUCCESS').then(function (translation) {
        $scope.savepopupsuccess = translation;
    });

    $translate('SETTINGS_SAVE_POPUPFAIL').then(function (translation) {
        $scope.savepopupfail = translation;
    });

    $translate('SETTINGS_SAVE_LOCATION_POPUP').then(function (translation) {
        $scope.SETTINGS_SAVE_LOCATION_POPUP = translation;
    });
    
    $ionicLoading.show({
        template: 'Loading...'
    });


    $scope.$on('$ionicView.enter', function() {
        User.getCurrentUser().then(function(resp){
            $rootScope.currentUser = resp.data;
            $scope.user = resp.data;
            $ionicLoading.hide();
        });

        Location.getUserLocations().then(function(resp){
            $scope.locations = resp.data;
        });
    });

    $scope.resetPw = function(){
        User.sendResetToken($rootScope.currentUser.email).then(function(){
             $ionicPopup.alert({
                  title: $scope.pwresetPopupTitle,
                 template: $scope.pwresetPopupText
             });
        },function () {
            $ionicPopup.alert({
                title: $scope.pwresetPopupTitle,
                template: $scope.pwresetPopupTextFailed
            });

        });
    };

    $scope.changeUserImage = function(){
        $rootScope.showImagePicker(function(resp){
            $scope.user.image = resp.data;
            User.updateUser($scope.user).then(function(resp){});
        });
    };


    $scope.changeUserNameAndEmail = function(){
        User.updateUser($scope.user).then(function(resp){
            $rootScope.currentUser = resp.data;
            $ionicPopup.alert({
                title: "",
                template: $scope.savepopupsuccess
            });
        }, function(){
            $ionicPopup.alert({
                title: "Error",
                template: $scope.savepopupfail
            });
        });
    };

    $scope.addLocation = function(){
        $rootScope.showMap().then(function(resp){

            $ionicPopup.prompt({
                title: $scope.SETTINGS_SAVE_LOCATION_POPUP,
                template: '<input ng-model="data.response" type="text" autofocus>',
                inputType: 'text',
                inputPlaceholder: 'Address'
            }).then(function (res) {
                var loc = {};
                loc.description = res;
                loc.fullAddress = resp.address;
                loc.lat = resp.lat;
                loc.lon = resp.lng;
                loc.userId = Auth.getUserId();
                $scope.locations.push(loc);

                Location.createLocation(loc).then(function(resp){});
            });
        });
    }

    $scope.deleteLocation = function(l){
        Location.deleteLocation(l).then(function(){
            var pos = -1;
            for(var i=0;i<$scope.locations.length;i++){
             pos = i;
            }
            if(pos >= 0){
                $scope.locations.splice(pos, 1);
            }
        });
    }

})
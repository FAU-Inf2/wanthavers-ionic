controllers.controller('SettingsCtrl', function($scope, $rootScope, $state ,$ionicModal, $ionicHistory, $translate,
                                                $ionicPopup, $ionicLoading, User, Auth) {
    $scope.user = {};


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
    
    $ionicLoading.show({
        template: 'Loading...'
    });


    $scope.$on('$ionicView.enter', function() {
        User.getCurrentUser().then(function(resp){
            $rootScope.currentUser = resp.data;
            $scope.user = resp.data;
            $ionicLoading.hide();
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

})
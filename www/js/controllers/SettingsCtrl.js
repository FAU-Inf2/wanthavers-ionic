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


    $ionicLoading.show({
        template: 'Loading...'
    });


    $scope.$on('$ionicView.enter', function() {
        $rootScope.currentUserId = Auth.getUserId();
        if($rootScope.currentUser == undefined){
            User.getCurrentUser().then(function(resp){
                $rootScope.currentUser = resp.data;
            });
        }
        $scope.user.name = $rootScope.currentUser.name;
        $scope.user.email = $rootScope.currentUser.email;
        $scope.user.img = $rootScope.currentUser.image;
        $ionicLoading.hide();
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
      console.log("User Image changed");
      //TODO
    };

    $scope.changeUserNameAndEmail = function(){
      console.log("User Name changed to: ",  $scope.user.name);
      console.log("User Email changed to: ", $scope.user.email);
      //TODO
    };

})
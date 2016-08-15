controllers.controller('SettingsCtrl', function($scope, $rootScope, $state ,$ionicModal, $ionicHistory,
                                                $ionicPopup, $ionicLoading, User, Auth) {
    $scope.user = {};

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
                  title: 'Password Reset',
                 template: 'Password was sent successfully'
             });
        },function () {
            $ionicPopup.alert({
                title: 'Password Reset failed',
                template: 'Password reset failed! Please try it again later.'
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
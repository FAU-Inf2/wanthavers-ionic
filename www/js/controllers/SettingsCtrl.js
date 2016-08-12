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
        $ionicPopup.prompt({
            title: 'Reset Password',
            template: 'Enter your email address',
            inputType: 'text',
            inputPlaceholder: 'Your Email'
        }).then(function(res) {
            User.sendResetToken(res);
        });

    };

    $scope.changeUserImage = function(){
      console.log("User Image changed");
      //TODO
    };

    $scope.changeUserName = function(){
      console.log("User Name changed to: ",  $scope.user.name);
      //TODO
    };


    $scope.changeUserEmail = function(){
      console.log("User Email changed to: ", $scope.user.email);
      //TODO
    }

})
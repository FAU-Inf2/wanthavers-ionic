controllers.controller('SettingsCtrl', function($scope, $rootScope, $state ,$ionicModal, $ionicHistory, $ionicPopup, User, Auth) {
    $scope.user = {};

    $scope.$on('$ionicView.enter', function() {
        $rootScope.currentUserId = Auth.getUserId();
        if($rootScope.currentUser == undefined){
            User.getCurrentUser().then(function(resp){
                $rootScope.currentUser = resp.data;
                $scope.user.name = $rootScope.currentUser.name;
                $scope.user.email = $rootScope.currentUser.email;
                $scope.user.img = $rootScope.currentUser.image;
            });
        }
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

    }

})
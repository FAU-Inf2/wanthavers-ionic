controllers.controller('LoginCtrl', function($scope, $state, Auth, User, $rootScope, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate) {

    $scope.loginData = {};
    $scope.signupData = {};

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.doLogin = function() {
        Auth.setCredentials($scope.loginData.username, $scope.loginData.password);

        User.getCurrentUser().then(function(resp){
            Auth.setUserId(resp.data.id);
            $rootScope.currentUser = resp.data;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $scope.loginData = {};
            $state.go("app.desirelist");
        },function(resp){
            $ionicPopup.alert({
                title: 'Error Signing In',
                template: 'Wrong password or username'
            });
        });
    };

    $scope.doSignup = function() {
        $scope.signupData.langCode = navigator.language || navigator.userLanguage;
        $scope.signupData.name = $scope.signupData.firstName;
        User.createUser($scope.signupData).then(function(resp){
            Auth.setCredentials($scope.signupData.email, $scope.signupData.password);
            Auth.setUserId(resp.data.id);
            $rootScope.currentUser = resp.data;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $scope.signupData = {};
            $state.go("app.desirelist");
        },function(resp){
            var msg = "Unknown Error";
            if(resp.status == 409){
                msg = "Your email address is already in use!"
            }

            $ionicPopup.alert({
                title: 'Error Signing Up',
                template: msg
            });

        });
    };

    $scope.resetPassword = function(){
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
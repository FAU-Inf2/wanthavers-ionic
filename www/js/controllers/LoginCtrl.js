controllers.controller('LoginCtrl', function($scope, $state, Auth, User, $rootScope, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate) {
    $scope.loginData = {};

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.doLogin = function() {
        Auth.setCredentials($scope.loginData.username, $scope.loginData.password);

        User.getCurrentUser().then(function(resp){
            $rootScope.currentUser = resp.data;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.desirelist");
        },function(resp){
            $ionicPopup.alert({
                title: 'Error Signing In',
                template: 'Wrong password or username'
            });
        });
    };


})
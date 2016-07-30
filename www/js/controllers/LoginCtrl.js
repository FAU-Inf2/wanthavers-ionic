controllers.controller('LoginCtrl', function($scope, $state, Auth, User, $rootScope, $ionicHistory) {
    $scope.loginData = {};

    $scope.doLogin = function() {
        Auth.setCredentials($scope.loginData.username, $scope.loginData.password);

        User.getCurrentUser().then(function(resp){
            $rootScope.currentUser = resp.data;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.desirelist");
        },function(resp){

        });
    };


})
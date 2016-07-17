controllers.controller('LoginCtrl', function($scope, $state, Auth, $ionicViewService) {
    $scope.loginData = {};

    $scope.doLogin = function() {
        Auth.setCredentials($scope.loginData.username, $scope.loginData.password);
        console.log($scope.loginData.username)
        $state.go("app.desirelist");
        
    };


})
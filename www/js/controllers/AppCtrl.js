controllers.controller('AppCtrl', function($scope, $ionicModal, $state, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.barButtonsMap = [];
    $scope.barButtons = [];
    //$scope.hideButtons = false;

    $scope.addButtons = function(arr){
        //icon: "ion-chatbubbles", name: "test", action: function
        var tmp = $scope.barButtonsMap[$state.current.name];
        if(tmp != undefined){
            return;
        }
        $scope.barButtonsMap[$state.current.name] = arr

    }

    $scope.$on('$ionicView.enter', function() {
            //$scope.barButtons = $scope.barButtonsMap[$state.current.name];
            //$scope.xxx = $scope.barButtonsMap[$state.current.name][0];
    });

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
        if(data.stateName == undefined)
            return;
        $scope.barButtons = $scope.barButtonsMap[data.stateName];
    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        
        window.localStorage.setItem("username", $scope.loginData.username);
        window.localStorage.setItem("password", $scope.loginData.password);
        $scope.closeLogin();
    };
})
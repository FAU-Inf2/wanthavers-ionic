controllers.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $state, User, Auth, tmhDynamicLocale, amMoment, $translate) {

    $scope.barButtonsMap = [];
    $scope.barButtons = [];

    $scope.setI18n = function(lang){
        tmhDynamicLocale.set(lang);
        amMoment.changeLocale(lang);
        $translate.use(lang);
    }

    $scope.addButtons = function(arr){
        var tmp = $scope.barButtonsMap[$state.current.name];

        $scope.barButtonsMap[$state.current.name] = arr
        $scope.barButtons = arr;
    }

    $scope.refreshButtons = function(){
        var tmp = $scope.barButtonsMap[$state.current.name];
        $scope.barButtonsMap[$state.current.name] = [];
        $scope.barButtonsMap[$state.current.name] = tmp;
    }

    $scope.removeButtons = function() {
        var tmp = $scope.barButtonsMap[$state.current.name];
        $scope.barButtonsMap[$state.current.name] = [];
    }

    $scope.$on('$ionicView.enter', function() {
        $rootScope.currentUserId = Auth.getUserId();
        if($rootScope.currentUser == undefined){
            User.getCurrentUser().then(function(resp){
               $rootScope.currentUser = resp.data;
                if(resp.data.langCode == null){
                    $scope.setI18n(navigator.language || navigator.userLanguage);
                }else{
                    var code = resp.data.langCode;
                    if(resp.data.langCode.contains("_")){
                        code = code.split("_")[0];
                    }
                    $scope.setI18n(code);
                }
            });
        }
    });

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
        if(data.stateName == undefined)
            return;
        $scope.barButtons = $scope.barButtonsMap[data.stateName];
    });

    $scope.logout = function(){
        Auth.setCredentials(undefined, undefined);
        Auth.setUserId(undefined);
        $state.go("app.startup");
    }


})
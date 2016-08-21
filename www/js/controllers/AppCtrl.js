controllers.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $state, User, Auth, tmhDynamicLocale, amMoment, $translate) {

    $rootScope.currentPosition = {};
    $rootScope.selectedMapPosition = {};
    $rootScope.mapModal = undefined;
    
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
        console.log(tmp)
        $scope.barButtonsMap[$state.current.name] = [];
        //$scope.barButtonsMap[$state.current.name] = tmp;
    }

    $scope.removeButtons = function() {
        var tmp = $scope.barButtonsMap[$state.current.name];
        $scope.barButtonsMap[$state.current.name] = [];
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        $rootScope.currentUserId = Auth.getUserId();
        if($state.current.name == "app.startup" && Auth.getEmailOfCurUser() != undefined && Auth.getPassword() != undefined){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.desirelist");
        }
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

    $rootScope.showMap = function(){
        if(typeof plugin == 'undefined'){
            //use google as default in browser
            $rootScope.selectedMapPosition.lat = 37.422476;
            $rootScope.selectedMapPosition.lng = -122.08425;
            $rootScope.selectedMapPosition.address = "Google, Mountain View";
            console.log($rootScope.selectedMapPosition);
            return;
        }

        if($rootScope.mapModal == undefined){
            $ionicModal.fromTemplateUrl('templates/map.html', {
                scope: null,
                animation: 'none',
                controller: 'MapCtrl'
            }).then(function(modal) {
                $rootScope.mapModal = modal;
                modal.show();
            });
        }else{
            $rootScope.mapModal.show();
            $rootScope.readyMap();
        }
    }


})
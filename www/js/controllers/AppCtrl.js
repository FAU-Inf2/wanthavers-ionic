controllers.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $ionicHistory, $state, User, Auth, tmhDynamicLocale, amMoment, $translate, $q, $ionicActionSheet, Media) {

    $rootScope.currentPosition = undefined;
    $rootScope.selectedMapPosition = {};
    $rootScope.mapDeferred = undefined;
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
        console.log(Auth.getPassword() == null);
        if($state.current.name == "app.startup" && Auth.getEmailOfCurUser() != null && Auth.getPassword() != null){
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
        Auth.clearCredentials();
        $state.go("app.startup");
    }


    $rootScope.showImagePicker = function(func_success, func_error){
        var sheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Camera' },
                { text: 'Gallery' }
            ],
            titleText: 'Select Photo Source',
            cancelText: 'Cancel',
            cancel: function() {
                sheet();
            },
            buttonClicked: function(index) {
                sheet();
                var source = Camera.PictureSourceType.CAMERA;
                if(index == 1){
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                }
                navigator.camera.getPicture(function(imageData){
                    $rootScope.isUploading = true;
                    Media.createMedia(encodeURIComponent(imageData),encodeURIComponent("xy.jpeg")).then(function(resp){
                        $rootScope.isUploading = false;
                        func_success(resp);
                    });
                }, function(e){
                    if(func_success != undefined)
                        func_error(e);
                }, {
                    sourceType: source,
                    destinationType: Camera.DestinationType.DATA_URL,
                    MediaType: Camera.MediaType.PICTURE,
                    quality: 50,
                    targetWidth: 1024,
                    targetHeight: 1024
                });

            }
        });
    }

    $rootScope.showMap = function(){
        $rootScope.mapDeferred = $q.defer();

        if(typeof plugin == 'undefined'){
            setTimeout(function() {
                //use google as default in browser
                var selectedMapPosition = {};
                selectedMapPosition.lat = 37.422476;
                selectedMapPosition.lng = -122.08425;
                selectedMapPosition.address = "Google, Mountain View";
                console.log(selectedMapPosition);
                $rootScope.mapDeferred.resolve(selectedMapPosition);
            }, 100);
        }else{
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

        return $rootScope.mapDeferred.promise;
    }


})
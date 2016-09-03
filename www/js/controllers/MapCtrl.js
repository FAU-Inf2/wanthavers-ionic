controllers.controller('MapCtrl', function ($scope, $state, Auth, User, $rootScope, $ionicPopup, $translate) {
    var m = undefined;
    var map = undefined;
    var POS = undefined;
    $scope.address = "";
    var mapReady = false;

    console.log(plugin.google.maps);


    $scope.promptTextTitle = "Custom Location";
    $translate('MAP_PROMPT_TITLE').then(function (translation) {
        $scope.translatedText = translation;
    });


    $scope.onTextFieldFocus= function(){
        map.setClickable(false);
        setTimeout(function() {
            document.getElementById("searchBox").setSelectionRange(0, 9999);
        }, 1);
    }

    $scope.onTextFieldBlur = function(){
        map.setClickable(true);
    }

    $scope.checkIfEnterKeyWasPressed = function($event){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            map.setClickable(true);
            cordova.plugins.Keyboard.close();
            $scope.onEnter();
        }
    };

    $scope.onEnter = function(){
        var request = {
            'address': document.getElementById("searchBox").value
        };
        plugin.google.maps.Geocoder.geocode(request, function (results) {
            if (results.length) {
                var result = results[0];
                var position = result.position;
                map.clear();
                map.addMarker({
                    'position': position,
                    'flat': true,
                    'icon': 'www/img/mapicon.png'
                }, function (marker) {
                    m = marker;
                    map.animateCamera({
                        'target': position,
                        'zoom': 16,
                        'duration': 1000
                    }, function () {

                    });

                });
            } else {
                alert("Not found");
            }
        });
    }

    $scope.showConfirm = function () {
        map.setClickable(false);

        $ionicPopup.prompt({
            title: $scope.promptTextTitle,
            template: '<input ng-model="data.response" type="text" autofocus>',
            inputType: 'text',
            inputPlaceholder: 'Address'
        }).then(function (res) {
            map.setClickable(true);
            var request = {
                'address': res
            };
            plugin.google.maps.Geocoder.geocode(request, function (results) {
                if (results.length) {
                    var result = results[0];
                    var position = result.position;
                    map.clear();
                    map.addMarker({
                        'position': position,
                        'flat': true,
                        'icon': 'www/img/mapicon.png'
                    }, function (marker) {
                        m = marker;
                        map.animateCamera({
                            'target': position,
                            'zoom': 16,
                            'duration': 1000
                        }, function () {

                        });

                    });
                } else {
                    alert("Not found");
                }
            });
        });
    }

    $rootScope.readyMap = function (lat, lng) {
        mapReady = true;
        if (lat != undefined && lng != undefined) {
            POS = new plugin.google.maps.LatLng(lat, lng);
        }else{
            POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
        }

        map.setDiv(document.getElementById("map_canvas"));
        document.getElementById("main").style.display = "none";
        map.clear();
        map.addMarker({
            'position': POS,
            'flat': true,
            'icon': 'www/img/mapicon.png'
        }, function (marker) {
            m = marker;
        });

        map.setCenter(POS);
        map.setClickable(true);
    }

    $scope.finish = function (success) {
        $rootScope.selectedMapPosition.success = success;
        if(success){
            $rootScope.mapDeferred.resolve($rootScope.selectedMapPosition);
        }else{
            $rootScope.mapDeferred.reject(new Error("canceled by user"));
        }
        console.log($rootScope.selectedMapPosition.lat);
        document.getElementById("main").style.display = "block";
        map.setDiv(null);
        $rootScope.mapModal.hide();
        map.clear();
        //map.setVisible(false);
        map.setClickable(false);
    }

    ionic.DomUtil.ready(function () {
        $rootScope.cordovaReady(function () {
            if ($rootScope.currentPosition == undefined) {
                POS = new plugin.google.maps.LatLng(37.422476, -122.08425);
            } else {
                POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
            }


            plugin.google.maps.Geocoder.geocode({'position': POS}, function (results) {
                if (results.length) {
                    var result = results[0];

                    if (result.extra.lines[0] == undefined || result.extra.lines[0].length == 0) {
                        var address = result.extra.lines[1];
                    } else {
                        var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                    }

                    $rootScope.selectedMapPosition.lat = POS.lat;
                    $rootScope.selectedMapPosition.lng = POS.lng;
                    $rootScope.selectedMapPosition.address = address;
                    if (document.getElementById("searchBox") != null) {
                        document.getElementById("searchBox").value = address;
                    }
                }
            });


            map = plugin.google.maps.Map.getMap({
                'controls': {
                    'myLocationButton': true
                },
                'camera': {
                    'latLng': POS,
                    'zoom': 16
                }
            });
            map.setCenter(POS);
            map.setMyLocationEnabled(true);
            map.setDiv(document.getElementById("map_canvas"));
            document.getElementById("main").style.display = "none";
            //map.setVisible(true);

            map.on(plugin.google.maps.event.CAMERA_CHANGE, function (pos) {
                if (!mapReady || m == undefined) {
                    return;
                }
                var tmp = new plugin.google.maps.LatLng(pos.target.lat, pos.target.lng);
                m.setPosition(tmp);

                var request = {
                    'position': tmp
                };

            });


            map.on(plugin.google.maps.event.CAMERA_IDLE, function (pos) {
                if (!mapReady) {
                    return;
                }

                var tmp = new plugin.google.maps.LatLng(pos.target.lat, pos.target.lng);

                var request = {
                    'position': tmp
                };

                plugin.google.maps.Geocoder.geocode(request, function (results) {
                    if (results.length) {
                        var result = results[0];
                        if (result.extra.lines[0] == undefined || result.extra.lines[0].length == 0) {
                            var address = result.extra.lines[1];
                        } else {
                            var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                        }
                        $rootScope.selectedMapPosition = pos.target;
                        $rootScope.selectedMapPosition.address = address;
                        document.getElementById("searchBox").value = address;
                    }
                });

            });
        });


        map.addEventListener(plugin.google.maps.event.MAP_READY, $rootScope.readyMap);
    });


})
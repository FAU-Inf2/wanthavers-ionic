controllers.controller('MapCtrl', function($scope, $state, Auth, User, $rootScope, $ionicPopup) {
    var m = undefined;
    var map = undefined;
    var POS = undefined;
    $scope.address = "";

    $scope.showConfirm = function(){
        map.setClickable(false);
        $ionicPopup.prompt({
            title: 'Custom Location',
            template: 'Enter an address',
            inputType: 'text',
            inputPlaceholder: 'Address'
        }).then(function(res) {
            map.setClickable(true);
            var request = {
                'address': res
            };
            plugin.google.maps.Geocoder.geocode(request, function(results) {
                if (results.length) {
                    var result = results[0];
                    var position = result.position;
                    map.clear();
                    map.addMarker({
                        'position': position,
                        'flat': true,
                        'icon': 'www/img/mapicon.png'
                    }, function(marker) {
                        m = marker;
                        map.animateCamera({
                            'target': position,
                            'zoom': 17,
                            'duration': 1000
                        }, function() {

                        });

                    });
                } else {
                    alert("Not found");
                }
            });
        });
    }

    $rootScope.readyMap = function () {
        map.setDiv(document.getElementById("map_canvas"));
        document.getElementById("main").style.display = "none";
        map.addMarker({
            'position': POS,
            'flat': true,
            'icon': 'www/img/mapicon.png'
        }, function (marker) {
            if(m != undefined){
                m.remove();
            }
            m = marker;
        });

        map.setCenter(POS);
        map.setClickable(true);
    }

    $scope.finish = function(){
        document.getElementById("main").style.display = "block";
        map.setDiv(null);
        $rootScope.mapModal.hide();
        console.log($rootScope.selectedMapPosition.address);
        map.clear();
        //map.setVisible(false);
        map.setClickable(false);
    }

    ionic.DomUtil.ready(function() {

        if($rootScope.currentPosition.latitude == undefined){
            POS = new plugin.google.maps.LatLng(37.422476, -122.08425);
        }else{
            POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
        }

        plugin.google.maps.Geocoder.geocode({'position': POS}, function(results) {
            if (results.length) {
                var result = results[0];

                if(result.extra.lines[0] == undefined || result.extra.lines[0].length==0){
                    var address = result.extra.lines[1];
                }else{
                    var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                }
                if(document.getElementById("searchBox") != null){
                    document.getElementById("searchBox").innerHTML = address;
                }
            }
        });


        map = plugin.google.maps.Map.getMap({
            'controls': {
                'myLocationButton': true
            },
            'camera': {
                'latLng': POS,
                    'zoom': 17
            }
        });
        map.setMyLocationEnabled(true);
        //map.setVisible(true);

        map.on(plugin.google.maps.event.CAMERA_CHANGE, function(pos){
            var tmp  = new plugin.google.maps.LatLng(pos.target.lat, pos.target.lng);
            m.setPosition(tmp);

            var request = {
                'position': tmp
            };

            plugin.google.maps.Geocoder.geocode(request, function(results) {
                if (results.length) {
                    var result = results[0];
                    if(result.extra.lines[0] == undefined || result.extra.lines[0].length==0){
                        var address = result.extra.lines[1];
                    }else{
                        var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                    }
                    $rootScope.selectedMapPosition = pos.target;
                    $rootScope.selectedMapPosition.address = address;
                    document.getElementById("searchBox").innerHTML = address;
                }
            });

        });

        map.addEventListener(plugin.google.maps.event.MAP_READY, $rootScope.readyMap);
    });


})
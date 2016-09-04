controllers.controller('FilterSettingCtrl', function($rootScope, $scope, $ionicModal, $ionicHistory, FilterSetting, CategoryList, Location, $translate, Auth) {
    $scope.filterSetting = {};
    $scope.obj = {};
    $scope.obj.locations = [];
    $scope.obj.locationChoice = undefined;
    $scope.filterSetting.radius = 50;
    $scope.CUSTOM_LOCATION = "";

    $scope.ratingValues = [1, 2, 3, 4, 5];

    $translate('CUSTOM_LOCATION').then(function (translation) {
        $scope.CUSTOM_LOCATION = translation;
    });

    $translate('FILTERSETTING_APPLY_HEADER').then(function (translation) {
        $scope.$parent.addButtons([{
            icon: "",
            name: translation,
            show: true,
            action: $scope.applyFilter

        }]);
    });


    $scope.setRating = function(val) {
        if(val == $scope.filterSetting.rating)
            delete $scope.filterSetting.rating;
        else
            $scope.filterSetting.rating = val;
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log("FilterSetting before", $scope.filterSetting);
        // We don't want a reference copy -> full copy by parsing JSON
        $scope.filterSetting = JSON.parse(JSON.stringify(FilterSetting.getFilterSetting()));
        console.log("FilterSetting after", $scope.filterSetting);
    });

    $scope.$on('$ionicView.enter', function() {
        Location.getUserLocations().then(function(resp){
            $scope.obj.locations = $scope.obj.locations.concat(resp.data);
        });

        if($rootScope.currentPosition != undefined){
            console.log("lat: "+$rootScope.currentPosition.latitude);
            console.log("lng: "+$rootScope.currentPosition.longitude);
            POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
            var request = {
                'position': POS
            };

            plugin.google.maps.Geocoder.geocode(request, function(results) {
                if (results.length) {
                    var result = results[0];
                    if(result.extra.lines[0] == undefined || result.extra.lines[0].length==0){
                        var address = result.extra.lines[1];
                    }else{
                        var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                    }

                    console.log(address);

                    $translate('CURRENT_LOCATION').then(function (translation) {
                        var loc = {};
                        loc.description = translation;
                        loc.fullAddress = address;
                        loc.lat = $rootScope.currentPosition.latitude;
                        loc.lon = $rootScope.currentPosition.longitude;
                        loc.userId = Auth.getUserId();
                        $scope.obj.locations.push(loc);
                        $scope.obj.locationChoice = loc;
                    });

                }
            }, function(error){console.log(error);});
        }
    });

    $scope.applyFilter = function(){
        $scope.filterSetting.lat = $scope.obj.locationChoice.lat;
        $scope.filterSetting.lon = $scope.obj.locationChoice.lon;
        $scope.filterSetting.address = $scope.obj.locationChoice.fullAddress;

        FilterSetting.applyFilter($scope.filterSetting);
        $ionicHistory.goBack();
    }

    $scope.resetFilter = function(){
        FilterSetting.resetFilter();
        $ionicHistory.goBack();
    }

    $ionicModal.fromTemplateUrl('templates/categorylist.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        CategoryList.list().then(function(resp){
            $scope.feed = resp.data;
        });
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.selectCategory = function(category) {
        $scope.filterSetting.category = category;
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.removeCategory = function() {
        delete $scope.filterSetting.category;
    };

    $scope.chooseDifferentLocation = function(){
        $rootScope.showMap().then(function(resp){
            var loc = {};
            loc.description = $scope.CUSTOM_LOCATION;
            loc.fullAddress = resp.address;
            loc.lat = resp.lat;
            loc.lon = resp.lng;
            loc.userId = Auth.getUserId();
            $scope.obj.locations.push(loc);
            $scope.obj.locationChoice = loc;
        });
    }

    $scope.removeLocation = function() {
        delete $scope.filterSetting.lat;
        delete $scope.filterSetting.lon;
        delete $scope.filterSetting.address;
        delete $scope.filterSetting.radius;
    };


})
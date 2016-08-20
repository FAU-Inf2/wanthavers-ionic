controllers.controller('FilterSettingCtrl', function($rootScope, $scope, $ionicModal, $ionicHistory, FilterSetting, CategoryList, Location) {
    $scope.filterSetting = {};

    $scope.getRating = function() {
        return FilterSetting.getMinRating() == null ? '0' : FilterSetting.getMinRating();
    }

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star',
        iconOnColor: ' ', // Hacking package: setting color in scss is preferred
        iconOffColor:  ' ',
        rating: $scope.getRating(), // ratingsObject will be parsed before 'beforeEnter' event -> use this to get current selected rating
        minRating: '0',
        callback: function(rating) {
            $scope.filterSetting.rating = rating;
        }
    };

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log("FilterSetting before", $scope.filterSetting);
        // We don't want a reference copy -> full copy by parsing JSON
        $scope.filterSetting = JSON.parse(JSON.stringify(FilterSetting.getFilterSetting()));
        console.log("FilterSetting after", $scope.filterSetting);
    })

    $scope.applyFilter = function(){
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

    $scope.removeCategory = function() {
        delete $scope.filterSetting.category;
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.selectLocation = function() {
        $rootScope.showMap();
        $scope.filterSetting.lat = $rootScope.selectedMapPosition.lat;
        $scope.filterSetting.lon = $rootScope.selectedMapPosition.lng;
        $scope.filterSetting.address = $rootScope.selectedMapPosition.address;
        $scope.filterSetting.radius = 100;
    };

    $scope.removeLocation = function() {
        delete $scope.filterSetting.lat;
        delete $scope.filterSetting.lon;
        delete $scope.filterSetting.address;
        delete $scope.filterSetting.radius;
    };

    $scope.getLocationString = function() {
        return Location.getLocationByCoords($scope.filterSetting.lat, $scope.filterSetting.lon);
    };

})
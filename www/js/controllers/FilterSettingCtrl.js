controllers.controller('FilterSettingCtrl', function($rootScope, $scope, $ionicModal, $ionicHistory, FilterSetting, CategoryList, Location) {
    $scope.filterSetting = {};

    $scope.ratingValues = [1, 2, 3, 4, 5];

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

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.removeCategory = function() {
        delete $scope.filterSetting.category;
    };

    $scope.selectLocation = function() {
        $rootScope.showMap().then(function(resp){
            console.log(resp)
            $scope.filterSetting.lat = resp.lat;
            $scope.filterSetting.lon = resp.lng;
            $scope.filterSetting.address = resp.address;
            $scope.filterSetting.radius = 100;
        });
    };

    $scope.removeLocation = function() {
        delete $scope.filterSetting.lat;
        delete $scope.filterSetting.lon;
        delete $scope.filterSetting.address;
        delete $scope.filterSetting.radius;
    };

})
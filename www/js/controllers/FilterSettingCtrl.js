controllers.controller('FilterSettingCtrl', function($scope, FilterSetting) {
    $scope.filterSetting = {};

    $scope.applyFilter = function(){
       FilterSetting.applyFilter($scope.filterSetting);
    }

    $scope.resetFilter = function(){
        FilterSetting.resetFilter();
    }
})
controllers.controller('FilterSettingCtrl', function($scope, $ionicModal, FilterSetting, CategoryList) {
    $scope.filterSetting = {};

    $scope.applyFilter = function(){
       FilterSetting.applyFilter($scope.filterSetting);
    }

    $scope.resetFilter = function(){
        FilterSetting.resetFilter();
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
})
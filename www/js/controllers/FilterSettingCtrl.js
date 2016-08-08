controllers.controller('FilterSettingCtrl', function($scope, $ionicModal, $ionicHistory, FilterSetting, CategoryList) {
    $scope.filterSetting = {};

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star',
        iconOnColor: ' ', // Hacking package: setting color in scss is preferred
        iconOffColor:  ' ',
        rating: '0',
        minRating: '0',
        callback: function(rating) {
            $scope.filterSetting.rating = rating;
        }
    };

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

})
controllers.controller('CategoryListCtrl', function($scope, $ionicHistory, CategoryList) {
    CategoryList.list().then(function(resp){
        $scope.feed = resp.data;
    });

    $scope.selectCategory = function(category){
        CategoryList.setSelectedCategory(category);
        $ionicHistory.goBack();
    }
})
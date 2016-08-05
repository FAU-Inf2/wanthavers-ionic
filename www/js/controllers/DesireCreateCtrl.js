controllers.controller('DesireCreateCtrl', function($scope, $state, $ionicModal,FilterSetting, CategoryList) {
    $scope.title = "Create Desire: Step 1";
    $scope.lastSlide = false;
    $scope.filterSetting = {};

    $scope.slideHasChanged = function (index) {
        $scope.lastSlide = false;
        switch(index){
            case 0:
                $scope.title = "Create Desire: Step 1";
                break;
            case 1:
                $scope.title = "Create Desire: Step 2";
                break;
            case 2:
                $scope.title = "Create Desire: Step 3";
                $scope.lastSlide = true;
                break;
        }
        $scope.$parent.addButtons([{
            icon: "ion-checkmark",
            name: "",
            show: $scope.lastSlide,
            action: function(){
                $state.go("app.filtersetting");
            }
        }]);
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
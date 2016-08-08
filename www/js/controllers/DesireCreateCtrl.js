controllers.controller('DesireCreateCtrl', function($scope, $state, $ionicModal,FilterSetting, Desire, CategoryList) {
    $scope.title = "Create Desire: Step 1";
    $scope.lastSlide = false;
    $scope.filterSetting = {};
    $scope.desire = {};
    $scope.currency = "Euro";
    $scope.selectedCurrency = "€";

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
        $scope.category = category;
        $scope.desire.categoryId = category.id;
        $scope.desire.image = category.image;
        console.log($scope.desire.categoryId);
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });


    $scope.currencyChanged = function (selectedCurrency) {
        switch (selectedCurrency) {
            case "€":
                $scope.currency = "Euro";
                break;
            case "$":
                $scope.currency = "Dollar";
                break;
            case "£":
                $scope.currency = "Pound";
                break;
        }
    }

    $scope.create = function(desire) {
        Desire.create(desire);

    }

})
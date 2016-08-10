controllers.controller('DesireCreateCtrl', function($scope, $state, $ionicModal, $ionicHistory ,$ionicPopup, FilterSetting, Desire, CategoryList) {
    $scope.title = "Create Desire: Step 1";
    $scope.lastSlide = false;
    $scope.filterSetting = {};
    $scope.desire = {};
    $scope.currency = "Euro";
    $scope.selectedCurrency = "€";
    $scope.desire.currency = "EUR";
    $scope.allFieldsFilled = false;

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
                $scope.checkForInput($scope.desire);
                if(!($scope.allFieldsFilled)) {
                    return;
                }

                Desire.create($scope.desire);
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $ionicHistory.goBack();
                //$state.go("app.desirelist");
            }
        }]);
    };

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
                $scope.desire.currency = "EUR";
                break;
            case "$":
                $scope.currency = "Dollar";
                $scope.desire.currency = "USD";
                break;
            case "£":
                $scope.currency = "Pound";
                $scope.desire.currency = "GBP";
                break;
        }
    };

    $scope.checkForInput = function(desire){

        if (desire.title == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Please Enter a Title'
            });
            return;
        }
        if (desire.description == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Please Select a Description'
            });
            return;
        }
        if (desire.price == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Please Select a Price'
            });
            return;
        }
        if (desire.categoryId == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Please Select a Category'
            });
            return;
        }
        if (desire.dropzone_string == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Please Enter a Dropzone'
            });
            return;
        }

        $scope.allFieldsFilled = true;
    };

    $scope.create = function(desire) {
        Desire.create(desire);
    }

});
controllers.controller('DesireCreateCtrl', function($scope, $state, $ionicModal, $ionicHistory ,$ionicPopup, FilterSetting, Desire, CategoryList, $translate, $ionicActionSheet, Media) {
    $scope.obj = {};
    $scope.obj.title = "";
    $scope.lastSlide = false;
    $scope.filterSetting = {};
    $scope.desire = {};
    $scope.currency = "Euro";
    $scope.selectedCurrency = "€";
    $scope.desire.currency = "EUR";
    $scope.allFieldsFilled = false;
    $scope.date = {};
    $scope.expirationDate = null;
    $scope.media = {};
    $scope.hasUploaded = false;
    $scope.dateSliderDays = 0;
    $scope.dateSliderHours = 1;
    $scope.dateSlider = 1;
    $scope.dateSlider2= 0;
    $scope.dateName = "Hours";
    $scope.value = false;


    $translate('DESIRECREATE_BAR_TITLE1').then(function (translation) {
        $scope.obj.title = translation;
        $scope.desirecreateBar1 = translation;
        console.log(translation);
    });

    $translate('DESIRECREATE_BAR_TITLE2').then(function (translation) {
        $scope.desirecreateBar2 = translation;
        console.log(translation);
    });

    $translate('DESIRECREATE_BAR_TITLE3').then(function (translation) {
        $scope.desirecreateBar3 = translation;
        console.log(translation);
    });


    $scope.slideHasChanged = function (index) {
        $scope.lastSlide = false;
        switch(index){
            case 0:
                $scope.obj.title = $scope.desirecreateBar1;
                break;
            case 1:
                $scope.obj.title = $scope.desirecreateBar2;
                break;
            case 2:
                $scope.obj.title = $scope.desirecreateBar3;
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

                $scope.create($scope.desire);
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
        if(!$scope.hasUploaded){
            $scope.desire.image = category.image;
        }
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

    $scope.checkForInput = function(desire) {

        $scope.getExpritionDate($scope.date);
        desire.expireDate = $scope.expirationDate;


        if ($scope.expirationDate!= null && $scope.expirationDate < new Date()){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Expiration Date has to be in the future!'
            });
            return;
        }


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
    };

    $scope.getExpritionDate = function(date){
        if (date.date != null) {
            $scope.expirationDate = new Date();
            $scope.expirationDate.setFullYear(date.date.getFullYear(), date.date.getMonth(), date.date.getDate());

            if (date.time == null) {
                $scope.expirationDate.setHours(23);
                $scope.expirationDate.setMinutes(59);
                $scope.expirationDate.setSeconds(59);
            } else {
                $scope.expirationDate.setHours(date.time.getHours());
                $scope.expirationDate.setMinutes(date.time.getMinutes());
                $scope.expirationDate.setSeconds(0);
            }

            console.log($scope.expirationDate);
        }

        console.log(new Date());
    }

    $scope.pickImage = function(){

        var sheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Camera' },
                { text: 'Gallery' }
            ],
            titleText: 'Select Photo Source',
            cancelText: 'Cancel',
            cancel: function() {
                sheet();
            },
            buttonClicked: function(index) {
                sheet();
                var source = Camera.PictureSourceType.CAMERA;
                if(index == 1){
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                }
                navigator.camera.getPicture(function(imageData){
                    Media.createMedia(encodeURIComponent(imageData),encodeURIComponent("xy.jpeg")).then(function(resp){
                        $scope.desire.image = resp.data;
                        $scope.hasUploaded = true;
                    });
                }, function(e){
                    console.log(e);
                }, {
                    sourceType: source,
                    destinationType: Camera.DestinationType.DATA_URL,
                    MediaType: Camera.MediaType.PICTURE,
                    quality: 50,
                    targetWidth: 1024,
                    targetHeight: 1024
                });

            }
        });


    };

    $scope.toggleChange = function() {
        if ($scope.value == false) {
            $scope.dateName = "Days";
            $scope.value = true;
            console.log($scope.dateSlider2);

        } else{
            $scope.dateName = "Hours";
            $scope.value = false;
            console.log($scope.dateSlider2);
        }
        console.log('testToggle changed to ' + $scope.value);
    };


});
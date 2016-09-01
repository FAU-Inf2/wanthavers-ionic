controllers.controller('DesireCreateCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicHistory ,$ionicPopup, FilterSetting, Desire, CategoryList, $translate, Media, Location, Auth) {
    $scope.obj = {};
    $scope.obj.title = "";
    $scope.lastSlide = false;
    $scope.filterSetting = {};
    $scope.desire = {};
    $scope.currency = "Euro";
    $scope.selectedCurrency = "€";
    $scope.desire.currency = " ";
    $scope.allFieldsFilled = false;
    $scope.date = {};
    //$scope.expirationDate = null;
    $scope.expireTimeSpan = null;
    $scope.media = {};
    $scope.hasUploaded = false;
    $scope.dateSlider = {};
    $scope.dateSlider.name = 'Hours';
    $scope.dateSlider.date = 1;
    $scope.locations = [];
    $scope.reverseBidding= {};
    $scope.reverseBidding.allowed = false;


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

    $translate('DESIRECREATE_REVERSEDBIDDING_POPUP_TITLE').then(function (translation) {
        $scope.reverseBiddingTitle = translation;
    });

    $translate('DESIRECREATE_REVERSEDBIDDING_POPUP_TEXT').then(function (translation) {
        $scope.reverseBiddingText = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TITLE').then(function (translation) {
        $scope.missingInputTitle = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TEXT_TITLE').then(function (translation) {
        $scope.missingInputTextTitle = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TEXT_DESCRIPTION').then(function (translation) {
        $scope.missingInputTextDescription = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TEXT_PRICE').then(function (translation) {
        $scope.missingInputTextPrice = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TEXT_CATEGORY').then(function (translation) {
        $scope.missingInputCategory = translation;
    });

    $translate('DESIRECREATE_MISSING_INPUT_TEXT_DROPZONE').then(function (translation) {
        $scope.missingInputDropzone = translation;
    });



    $scope.newLocation = function(){
        
    }

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
            icon: "",
            name: "Publish",
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
                //$ionicHistory.goBack();
                $state.go("app.desirelist");
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
            case "CHF":
                $scope.currency = "CHF";
                $scope.desire.currency = "CHF";
                break;

        }
    };

    $scope.checkForInput = function(desire) {

        //$scope.getExpritionDate($scope.date);
        //desire.expireDate = $scope.expirationDate;

        $scope.getExpireTimeSpan($scope.dateSlider.date);
        desire.validTimespan = $scope.expireTimeSpan;


        /*if ($scope.expirationDate!= null && $scope.expirationDate < new Date()){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: 'Error Creating a Desire!',
                template: 'Expiration Date has to be in the future!'
            });
            return;
        }*/


        if (desire.title == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: $scope.missingInputTitle,
                template: $scope.missingInputTextTitle
            });
            return;
        }
        if (desire.description == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: $scope.missingInputTitle,
                template: $scope.missingInputTextDescription
            });
            return;
        }
        if (desire.price == null && !$scope.reverseBidding.allowed){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: $scope.missingInputTitle,
                template: $scope.missingInputTextPrice
            });
            return;
        }
        if (desire.categoryId == null){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: $scope.missingInputTitle,
                template: $scope.missingInputCategory
            });
            return;
        }
        if ($scope.locationChoice == undefined){
            $scope.allFieldsFilled = false;
            $ionicPopup.alert({
                title: $scope.missingInputTitle,
                template: $scope.missingInputDropzone
            });
            return;
        }

        $scope.allFieldsFilled = true;
    };

    $scope.create = function(desire) {
        desire.dropzone_string = $scope.locationChoice.fullAddress;
        desire.dropzone_lat = $scope.locationChoice.lat;
        desire.dropzone_long = $scope.locationChoice.long;
        desire.biddingAllowed = $scope.reverseBidding.allowed;

        console.log(desire);
        Desire.create(desire);
    };

    $scope.getExpireTimeSpan = function(timeSpan){
        console.log($scope.dateSlider.name);
        console.log(new Date().getTime());
        if ($scope.dateSlider.name == 'Days'){
            $scope.expireTimeSpan = timeSpan *24 * 3600000;
            console.log($scope.expireTimeSpan);

        }else if ($scope.dateSlider.name == 'Hours'){
            $scope.expireTimeSpan = timeSpan * 3600000;
            console.log($scope.expireTimeSpan);
        }
    };

    /*$scope.getExpritionDate = function(date){
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
    }*/

    $scope.pickImage = function(){
        $rootScope.showImagePicker(function(resp){
            $scope.desire.image = resp.data;
            $scope.hasUploaded = true;
        });
    };


    $scope.$on('$ionicView.enter', function() {
        Location.getUserLocations().then(function(resp){
            $scope.locations = resp.data;

            if($rootScope.currentPosition != undefined){
                POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
                var request = {
                    'position': POS
                };

                plugin.google.maps.Geocoder.geocode(request, function(results) {
                    if (results.length) {
                        var result = results[0];
                        if(result.extra.lines[0] == undefined || result.extra.lines[0].length==0){
                            var address = result.extra.lines[1];
                        }else{
                            var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                        }

                        $translate('CURRENT_LOCATION').then(function (translation) {
                            var loc = {};
                            loc.description = translation;
                            loc.fullAddress = address;
                            loc.lat = $rootScope.currentPosition.latitude;
                            loc.lon = $rootScope.currentPosition.longitude;
                            loc.userId = Auth.getUserId();
                            $scope.locations.push(loc);
                            $scope.locationChoice = loc;
                        });

                    }
                });
            }
        });
    });

    $scope.chooseDifferentLocation = function(){
        $rootScope.showMap().then(function(resp){
            var loc = {};
            loc.description = "Custom";
            loc.fullAddress = resp.address;
            loc.lat = resp.latitude;
            loc.lon = resp.longitude;
            loc.userId = Auth.getUserId();
            $scope.locations.push(loc);
            $scope.locationChoice = loc;
        });
    }

    $scope.showReversedBiddingInfo = function(){
        if ($scope.reverseBidding.allowed == true){

            $ionicPopup.alert({
                title: $scope.reverseBiddingTitle,
                template: $scope.reverseBiddingText
            });
        }
    }


});
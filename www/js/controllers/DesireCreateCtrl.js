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
    $scope.dateSlider.date = 3;
    $scope.dateSlider.number = 14;
    $scope.locations = [];
    $scope.reverseBidding= {};
    $scope.reverseBidding.allowed = false;
    $scope.hourInMilliseconds = 3600000;
    $scope.obj.locationChoice = undefined;

    $scope.CUSTOM_LOCATION = "";


    $translate('DESIRECREATE_BAR_TITLE1').then(function (translation) {
        $scope.obj.title = translation;
        $scope.desirecreateBar1 = translation;
        console.log(translation);
    });

    $translate('CUSTOM_LOCATION').then(function (translation) {
        $scope.CUSTOM_LOCATION = translation;
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

    $translate('DESIRECREATE_EXPIRE_INPUT_DAY').then(function (translation) {
        $scope.expireInputDay = translation;
    });

    $translate('DESIRECREATE_EXPIRE_INPUT_DAYS').then(function (translation) {
        $scope.expireInputDays = translation;
    });

    $translate('DESIRECREATE_EXPIRE_INPUT_WEEK').then(function (translation) {
        $scope.expireInputWeek = translation;
    });

    $translate('DESIRECREATE_EXPIRE_INPUT_WEEKS').then(function (translation) {
        $scope.expireInputWeeks = translation;
        $scope.dateSlider.name = $scope.expireInputWeeks;
    });


    $translate('DESIRECREATE_EXPIRE_INPUT_HOUR').then(function (translation) {
        $scope.expireInputHour = translation;
    });

    $translate('DESIRECREATE_EXPIRE_INPUT_HOURS').then(function (translation) {
        $scope.expireInputHours = translation;
    });

    //$scope.dateSlider.name = $scope.expireInputWeeks;



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

        $scope.getExpireTimeSpan($scope.dateSlider);
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
        if ($scope.obj.locationChoice == undefined){
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
        desire.dropzone_string = $scope.obj.locationChoice.fullAddress;
        desire.dropzone_lat = $scope.obj.locationChoice.lat;
        desire.dropzone_long = $scope.obj.locationChoice.lon;
        desire.biddingAllowed = $scope.reverseBidding.allowed;

        console.log(desire);
        Desire.create(desire);
    };

    $scope.getExpireTimeSpan = function(timeSpan){
        console.log($scope.dateSlider.name);
        console.log(new Date().getTime());

        switch (timeSpan.number) {

            //1h 2h 3h 5h 10h 15h 1d 2d 3d 5d 1w 2w 1w
            case "1":
                //1h
                $scope.expireTimeSpan = $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "2":
                //2h
                $scope.expireTimeSpan = 2 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "3":
                //3h
                $scope.expireTimeSpan = 3 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "4":
                //5h
                $scope.expireTimeSpan = 5 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "5":
                //10h
                $scope.expireTimeSpan = 10 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "6":
                //15h
                $scope.expireTimeSpan = 15 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "7":
                //1d
                $scope.expireTimeSpan = 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "8":
                //2d
                $scope.expireTimeSpan = 2 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "9":
                //3d
                $scope.expireTimeSpan = 3 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "10":
                //5d
                $scope.expireTimeSpan = 5 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "11":
                //1w
                $scope.expireTimeSpan = 7 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "12":
                //2w
                $scope.expireTimeSpan = 2 * 7 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;
            case "13":
                //3w
                $scope.expireTimeSpan = 3 * 7 * 24 * $scope.hourInMilliseconds;
                console.log($scope.expireTimeSpan);
                break;

            }

        /*if ($scope.dateSlider.name == 'Days'){
            $scope.expireTimeSpan = timeSpan.number *24 * 3600000;
            console.log($scope.expireTimeSpan);

        }else if ($scope.dateSlider.name == 'Hours'){
            $scope.expireTimeSpan = timeSpan.number * 3600000;
            console.log($scope.expireTimeSpan);
        }*/
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
        $scope.locations = [];

        Location.getUserLocations().then(function(resp){
            $scope.locations = $scope.locations.concat(resp.data);
            console.log($scope.locations);
        });

        if($rootScope.currentPosition != undefined){
            console.log("lat: "+$rootScope.currentPosition.latitude);
            console.log("lng: "+$rootScope.currentPosition.longitude);
            POS = new plugin.google.maps.LatLng($rootScope.currentPosition.latitude, $rootScope.currentPosition.longitude);
            var request = {
                'position': POS
            };

            plugin.google.maps.Geocoder.geocode(request, function(results) {
                console.log("GEOCODER returns ->")
                if (results.length) {
                    var result = results[0];
                    if(result.extra.lines[0] == undefined || result.extra.lines[0].length==0){
                        var address = result.extra.lines[1];
                    }else{
                        var address = result.extra.lines[0] + ", " + result.extra.lines[1];
                    }

                    console.log(address);

                    $translate('CURRENT_LOCATION').then(function (translation) {
                        var loc = {};
                        loc.description = translation;
                        loc.fullAddress = address;
                        loc.lat = $rootScope.currentPosition.latitude;
                        loc.lon = $rootScope.currentPosition.longitude;
                        loc.userId = Auth.getUserId();
                        $scope.locations.push(loc);
                        $scope.obj.locationChoice = loc;
                    });

                }
            }, function(error){console.log(error);});
        }
    });

    $scope.chooseDifferentLocation = function(){
        $rootScope.showMap().then(function(resp){
            var loc = {};
            loc.description = $scope.CUSTOM_LOCATION;
            loc.fullAddress = resp.address;
            loc.lat = resp.lat;
            loc.lon = resp.lng;
            loc.userId = Auth.getUserId();
            $scope.locations.push(loc);
            $scope.obj.locationChoice = loc;
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


    $scope.validTimespanChanged = function () {

        switch ($scope.dateSlider.number) {
            //1h 2h 3h 5h 10h 15h 1d 2d 3d 5d 1w 2w 1w
            case "1":
                //1h
                $scope.dateSlider.name = $scope.expireInputHour;
                $scope.dateSlider.date = 1;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "2":
                //2h
                $scope.dateSlider.name = $scope.expireInputHours;
                $scope.dateSlider.date = 2;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "3":
                //3h
                $scope.dateSlider.name = $scope.expireInputHours;
                $scope.dateSlider.date = 3;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "4":
                //5h
                $scope.dateSlider.name = $scope.expireInputHours;
                $scope.dateSlider.date = 5;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "5":
                //10h
                $scope.dateSlider.name = $scope.expireInputHours;
                $scope.dateSlider.date = 10;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "6":
                //15h
                $scope.dateSlider.name = $scope.expireInputHours;
                $scope.dateSlider.date = 15;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "7":
                //1d
                $scope.dateSlider.name = $scope.expireInputDay;
                $scope.dateSlider.date = 1;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "8":
                //2d
                $scope.dateSlider.name = $scope.expireInputDays;
                $scope.dateSlider.date = 2;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "9":
                //3d
                $scope.dateSlider.name = $scope.expireInputDays;
                $scope.dateSlider.date = 3;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "10":
                //5d
                $scope.dateSlider.name = $scope.expireInputDays;
                $scope.dateSlider.date = 5;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "11":
                //1w
                $scope.dateSlider.name = $scope.expireInputWeek;
                $scope.dateSlider.date = 1;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "12":
                //2w
                $scope.dateSlider.name = $scope.expireInputWeeks;
                $scope.dateSlider.date = 2;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;
            case "13":
                //3w
                $scope.dateSlider.name = $scope.expireInputWeeks;
                $scope.dateSlider.date = 3;
                console.log( $scope.dateSlider.date + " " + $scope.dateSlider.name);
                break;

        }
    };


});
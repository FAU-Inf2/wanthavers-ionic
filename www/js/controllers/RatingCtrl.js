controllers.controller('RatingCtrl', function($rootScope, $scope, $stateParams, $ionicHistory, Rating, $ionicPopup, $translate) {

    $scope.$parent.removeButtons();

    $translate('RATING_POPUP_TITLE').then(function (translation) {
        $scope.ratingPopupTitle = translation;
    });

    $translate('RATING_POPUP_SUBTITLE').then(function (translation) {
        $scope.ratingPopupSubtitle = translation;
    });

    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.desire = $stateParams.desire;
        $scope.haver = $stateParams.haver;
        $scope.rating = 0;
    })

    $scope.ratingValues = [1, 2, 3, 4, 5];

    $scope.setRating = function(val) {
        if(val == $scope.rating)
            delete $scope.rating;
        else
            $scope.rating = val;
    }

    $scope.submitRating = function() {
        var userId;
        if ($scope.desire.creator.id == $rootScope.currentUserId) {
            userId = $scope.haver.user.id;
        } else {
            userId = $scope.desire.creator.id;
        }
        console.log("Rating-Inputs - desireId: " + $scope.desire.id + " userId: " + userId +" rating: " + $scope.rating);
        Rating.createRating($scope.desire.id, userId, $scope.rating);
        $ionicHistory.goBack();
    }


    $scope.$parent.addButtons([
        {
            icon: "icon ion-checkmark-round",
            name: "",
            show: true,
            action: function(){
                if ($scope.rating != 0 && $scope.rating != undefined) {
                    $scope.submitRating();
                } else {
                    $ionicPopup.alert({
                        title: $scope.ratingPopupTitle,
                        template: $scope.ratingPopupSubtitle
                    });
                }
            }
        }
    ]);

})

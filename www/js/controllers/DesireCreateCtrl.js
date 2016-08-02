controllers.controller('DesireCreateCtrl', function($scope, $state) {
    $scope.title = "Create Desire: Step 1";
    $scope.lastSlide = false;

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



})
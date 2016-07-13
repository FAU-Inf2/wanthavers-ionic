controllers.controller('DesireListCtrl', function($scope, Desire, $state) {

    Desire.list().then(function(resp){
        $scope.feed = resp.data;
    });


    $scope.$parent.addButtons([{
        icon: "ion-chatbubbles",
        name: "",
        action: function(){
            $state.go("app.browse");
        }
    }]);


})
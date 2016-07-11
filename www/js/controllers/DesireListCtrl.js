controllers.controller('DesireListCtrl', function($scope, Desire) {

    Desire.list().then(function(resp){
        $scope.feed = resp.data;
    });
})
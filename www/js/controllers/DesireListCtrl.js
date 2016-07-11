controllers.controller('DesireListCtrl', function($scope, Desire, $base64) {

    Desire.list().then(function(resp){
        $scope.feed = resp.data;
    });
    
})
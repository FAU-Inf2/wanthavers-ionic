wanthaver.factory('Desire', ['$http', function ($http, $scope) {
    return {

        list: function(){
            return $http.get(server+'/v1/desires');
        },




    };
}]);

wanthaver.factory('Chat', ['$http', function ($http, $scope) {
    return {

        list: function(){
            return $http.get(server+'/v1/chat');
        },
        
    };
}]);
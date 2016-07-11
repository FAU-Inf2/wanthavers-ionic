wanthaver.factory('Desire', ['$http', function ($http, $scope) {
    return {

        list: function(){
            return $http.get(server+'/v1/desires');
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        },




    };
}]);

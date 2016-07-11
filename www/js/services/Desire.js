wanthaver.factory('Desire', ['$http', 'Auth', function ($http, Auth) {
    return {

        list: function(){
            return $http.get(server+'/v1/desires');
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        },


        test: function(){
            return $http.get(server+'/v1/chat', Auth.enable());
        }


    };
}]);

wanthaver.factory('User', ['$http', 'Auth', function ($http, Auth) {
    return {

        getCurrentUser: function(){
            return $http.get(server+'/v1/login', Auth.getHeaderObject());
        }

    };
}]);

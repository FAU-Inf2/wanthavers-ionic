wanthaver.factory('Rating', ['$http', 'Auth', function ($http, Auth) {
    return {
        createRating: function(desireId, userId, rating){
            return $http.post(server+'/v1/users/'+userId+'/ratings', rating, Auth.getHeaderObject());
        }
    };
}]);

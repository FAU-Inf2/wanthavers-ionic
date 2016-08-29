wanthaver.factory('Rating', ['$http', 'Auth', function ($http, Auth) {
    return {
        createRating: function(desireId, userId, rating){
            return $http.post(server+'/v1/users/'+userId+'/ratings?desire_id='+desireId+"&stars="+rating+"&comment=", {}, Auth.getHeaderObject(true));
        }
    };
}]);

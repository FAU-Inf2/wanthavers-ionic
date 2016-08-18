wanthaver.factory('Media', ['$http', 'Auth', function ($http, Auth) {
    return {
        //hhh
        createMedia: function(base64, filename){
            return $http.post(server+'/v1/media', "base64="+base64+"&filename="+filename, Auth.getHeaderObject(true));
        }
    };
}]);
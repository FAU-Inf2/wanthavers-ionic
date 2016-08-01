wanthaver.factory('Location', ['$http', 'Auth', function ($http, Auth) {
    return {
        
        getLocationByCoords: function(lat, lon){
            return $http.get(server+'/v1/locations/geocoder?lat='+lat+"&lon="+lon, Auth.getHeaderObject());
        }
    };
}]);
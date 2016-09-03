wanthaver.factory('Location', ['$http', 'Auth', function ($http, Auth) {
    return {
        
        getLocationByCoords: function(lat, lon){
            return $http.get(server+'/v1/locations/geocoder?lat='+lat+"&lon="+lon, Auth.getHeaderObject());
        },

        getUserLocations: function () {
            return $http.get(server+'/v1/users/locations', Auth.getHeaderObject());
        },

        createLocation: function(l){
            return $http.post(server+'/v1/locations', l, Auth.getHeaderObject());
        },

        deleteLocation: function(l){
            return $http.delete(server+'/v1/locations/'+l.id, Auth.getHeaderObject(true));
        }
    };
}]);
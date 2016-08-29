wanthaver.factory('Haver', ['$http', 'Auth', function ($http, Auth) {
    return {

        createHaver: function(desireId, requestedPrice) {
            return $http.post(server+'/v1/desires/'+desireId+'/havers', {status:0, desireId: desireId, requestedPrice: requestedPrice}, Auth.getHeaderObject());
        },

        getAllHavers: function(desireId){
            return $http.get(server+'/v1/desires/'+desireId+'/havers');
        },

        getAcceptedHaver: function (desireId) {
            return $http.get(server+'/v1/desires/'+desireId+'/havers/accepted');
        },

        getHaverByUserId: function(desireId, userId){
            return $http.get(server+'/v1/desires/'+desireId+'/havers/'+userId);
        },

        updateRequestedPrice: function(desireId, userId, requestedPrice) {
            return $http.put(server +'/v1/desires/'+desireId+'/havers/'+userId+'/requestedprice?requestedprice='+requestedPrice, {}, Auth.getHeaderObject(true));
        },

        updateHaverStatus: function(desireId, userId, status){
            return $http.put(server+'/v1/desires/'+desireId+'/havers/'+userId+'/status?status='+status, {}, Auth.getHeaderObject(true));
        }
    };
}]);
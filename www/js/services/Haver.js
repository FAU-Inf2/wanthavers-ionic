wanthaver.factory('Haver', ['$http', 'Auth', function ($http, Auth) {
    return {

        getAllHavers: function(desireId){
            return $http.get(server+'v1/desires/'+desireId+'/havers');
        },

        getAcceptedHaver: function (desireId) {
            return $http.get(server+'v1/desires/'+desireId+'/havers/accepted');
        },

        getHaverByUserId: function(desireId, userId){
            return $http.get(server+'v1/desires/'+desireId+'/havers/'+userId);
        },

        updateHaverStatus: function(desireId, userId, status){
            return $http.put(server+'v1/desires/'+desireId+'/havers/'+userId+'/status?status='+status);
        }
    };
}]);
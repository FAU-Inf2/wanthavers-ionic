wanthaver.factory('Desire', ['$http', 'Auth', 'FilterSetting', function ($http, Auth, FilterSetting) {
    return {

        list: function(last_desire_id, mode, user_id){

            var limit = 6;
            var p = {
                category: FilterSetting.getCategory(),
                price_min: FilterSetting.getMinPrice(),
                price_max:  FilterSetting.getMaxPrice(),
                lat: FilterSetting.getLat(),
                lon: FilterSetting.getLon(),
                rating_min: FilterSetting.getMinRating(),
                radius: FilterSetting.getRadius(),
                last_desire_id: last_desire_id,
                limit : limit,
                status: 1
            };

            if(mode == "my"){
                p.creator_id = user_id;
                p.haver_id = user_id;
                p.status = [1,2,3];
            }

            console.log(p);

            return $http.get(server+'/v1/desires', {
                params: p
            });
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        },

        create: function(desire){
            console.log(desire);
            return $http.post(server+'/v1/desires',
                desire,
                Auth.getHeaderObject()

            );
        },

        deleteDesire: function(id) {
            return $http.delete(server+'/v1/desires/'+id, Auth.getHeaderObject());
        },

        flagDesire: function(desireId, desireFlag, comment) {
            return $http.post(server+'/v1/desires/'+desireId+'/flags', {desireId: desireId, flagReason: desireFlag, comment: comment}, Auth.getHeaderObject());
        },

        getChat: function(id, user2) {
            return $http.get(server+'/v1/desires/'+id+'/chat/'+user2, Auth.getHeaderObject());
        },

        updateDesireStatus: function(id, status) {
            return $http.put(server+'/v1/desires/'+id+'/status?status='+status, {}, Auth.getHeaderObject(true));
        },

        getSuccessfulDesires: function(user_id){

            var limit = 2147483647;
            var p = {
                category: null,
                limit : limit,
                status: 3,
                creator_id:  user_id,
                haver_id: user_id
            };
            console.log(p);

            return $http.get(server+'/v1/desires', {
                params: p
            });
        },


        getCanceledDesires: function(user_id){

            var limit = 2147483647 ;
            var p = {
                category: null,
                limit : limit,
                status: [0,1,2,3,4],
                haver_id: user_id,
                haver_status: 3
            };
            console.log(p);

            return $http.get(server+'/v1/desires', {
                params: p
            });
        },

        getDesireByUserId: function(user_id){
            var limit = 2147483647 ;
            var p = {
                category: null,
                limit : limit,
                status: [0,1,2,3,4],
                creator_id: user_id,
                haver_id: user_id,
            };
            console.log(p);

            return $http.get(server+'/v1/desires', {
                params: p
            });
        }

    };
}]);
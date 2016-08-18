wanthaver.factory('Desire', ['$http', 'Auth', 'FilterSetting', function ($http, Auth, FilterSetting) {
    return {

        list: function(last_desire_id, mode, user_id){

            var limit = 6;
            var p = {
                category: FilterSetting.getCategory(),
                price_min: FilterSetting.getMinPrice(),
                price_max:  FilterSetting.getMaxPrice(),
                rating_min: FilterSetting.getMinRating(),
                radius: FilterSetting.getRadius(),
                last_desire_id: last_desire_id,
                limit : limit,
                status: 1
            };

            if(mode == "creator"){
                p.creator_id = user_id;
            }

            if(mode == "haver"){
                p.haver_id = user_id;
            }

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

        flagDesire: function(id, desireFlag) {
            return $http.post(server+'/v1/desires/'+id+'/flags'+desireFlag, Auth.getHeaderObject());
        },

        getChat: function(id, user2) {
            return $http.get(server+'/v1/desires/'+id+'/chat/'+user2, Auth.getHeaderObject());
        },

        updateDesireStatus: function(id, status) {
            return $http.put(server+'/v1/desires/'+id+'/status?status='+status, {}, Auth.getHeaderObject(true));
        }

    };
}]);
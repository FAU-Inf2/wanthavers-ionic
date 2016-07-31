wanthaver.factory('Desire', ['$http', 'Auth', 'FilterSetting', function ($http, Auth, FilterSetting) {
    return {

        list: function(){
            category = FilterSetting.getCategory();
            return $http.get(server+'/v1/desires', {
                params: {
                    category: category
                }
            });
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        }
    };
}]);
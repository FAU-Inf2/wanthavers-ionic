wanthaver.factory('Desire', ['$http', 'Auth', 'FilterSetting', function ($http, Auth, FilterSetting) {
    return {

        list: function(last_desire_id){
            var limit = 6;
            var category = FilterSetting.getCategory();
            var minPrice = FilterSetting.getMinPrice();
            var maxPrice = FilterSetting.getMaxPrice();
            return $http.get(server+'/v1/desires', {
                params: {
                    category: category,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    last_desire_id: last_desire_id,
                    limit : limit
                }
            });
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        }
    };
}]);
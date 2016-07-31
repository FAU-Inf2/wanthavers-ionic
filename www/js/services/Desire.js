wanthaver.factory('Desire', ['$http', 'Auth', 'FilterSetting', function ($http, Auth, FilterSetting) {
    return {

        list: function(){
            category = FilterSetting.getCategory();
            minPrice = FilterSetting.getMinPrice();
            maxPrice = FilterSetting.getMaxPrice();
            return $http.get(server+'/v1/desires', {
                params: {
                    category: category,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                }
            });
        },

        getDetail: function (id) {
            return $http.get(server+'/v1/desires/'+id);
        }
    };
}]);
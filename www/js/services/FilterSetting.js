wanthaver.factory('FilterSetting', ['$rootScope', function($rootScope) {
    /**
     * Saves all filter settings for desirelist in an object.
     * If no filter is set for a specific value (e.g. rating), the field should be undefined.
     * filterSetting object is currently only set/reset by FilterSettingCtrl.
     * **/

    return {
        filterSetting: {},

        applyFilter: function(filterSetting){
            //window.localStorage.setItem("filterSetting", JSON.stringify(filterSetting));
            this.filterSetting = filterSetting;
            console.log("Applied filter ", this.filterSetting);
        },

        resetFilter: function(){
            this.filterSetting = {};
        },

        getFilterSetting: function(){
            return this.filterSetting;
        },

        getCategory: function(){
            return this.filterSetting.category != null ? this.filterSetting.category.id : null;
        },

        getMinPrice: function(){
            return this.filterSetting.minPrice;
        },

        getMaxPrice: function(){
            return this.filterSetting.maxPrice;
        },

        getMinRating: function(){
            return this.filterSetting.rating;
        },

        getRadius: function(){
            return this.filterSetting.radius;
        },

        getLat: function(){
            if(this.filterSetting.lat == undefined){
                if($rootScope.currentPosition == undefined){
                    return undefined;
                }else{
                    return $rootScope.currentPosition.latitude;
                }

            }else{
                return this.filterSetting.lat;
            }
        },

        getLon: function(){
            if(this.filterSetting.lat == undefined){
                if($rootScope.currentPosition == undefined){
                    return undefined;
                }else{
                    return $rootScope.currentPosition.longitude;
                }

            }else{
                return this.filterSetting.lon;
            }
        }
    };
}]);
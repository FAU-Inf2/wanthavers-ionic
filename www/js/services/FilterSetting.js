wanthaver.factory('FilterSetting', function() {
    return {
        filterSetting: {},

        applyFilter: function(filterSetting){
            //window.localStorage.setItem("filterSetting", JSON.stringify(filterSetting));
            this.filterSetting = filterSetting;
        },

        resetFilter: function(){
            this.filterSetting = {};
        },

        getCategory: function(){
            return this.filterSetting.category;
        },

        getMinPrice: function(){
            return this.filterSetting.minPrice;
        },

        getMaxPrice: function(){
            return this.filterSetting.maxPrice;
        },
    };
});
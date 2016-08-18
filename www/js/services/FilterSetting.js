wanthaver.factory('FilterSetting', function() {
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
        }
    };
});
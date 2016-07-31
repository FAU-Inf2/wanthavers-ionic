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

        setCategory: function(category){
            this.filterSetting.category = category;
        },
    };
});
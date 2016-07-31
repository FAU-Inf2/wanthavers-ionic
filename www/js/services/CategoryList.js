wanthaver.factory('CategoryList', function ($http, Auth) {
    return {
        selectedCategory: {},

        list: function(){
            return this.get(0);
        },

        get: function(id){
            return $http.get(server+'/v1/categories/'+id+'/subcategories', Auth.getHeaderObject());
        },
        
        getSelectedCategory: function(){
            return this.selectedCategory;
        },
        
        setSelectedCategory: function(category){
            this.selectedCategory = category;
        }
    };
});
wanthaver.factory('Auth', ['$base64', function ($base64) {
    return {

        getHeader: function(){
            var user = window.localStorage.getItem("username");
            var password = window.localStorage.getItem("password");
            var auth = $base64.encode(user+":"+password);
            var headers = {"Authorization": "Basic " + auth};
            return headers;
        },

        enable: function(){
            return {headers: this.getHeader()}
        }

    };
}]);

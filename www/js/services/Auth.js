wanthaver.factory('Auth', ['$base64', function ($base64) {
    return {

        getHeader: function(){
            var user = window.localStorage.getItem("username");
            var password = window.localStorage.getItem("password");
            var auth = $base64.encode(user+":"+password);
            var headers = {"Authorization": "Basic " + auth};
            return headers;
        },

        getHeaderObject: function(){
            return {headers: this.getHeader()}
        },

        setCredentials: function(username, password) {
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
        },

        setUserId: function(id) {
            window.localStorage.setItem("userId", id);
        },

        getUserId: function() {
            return parseInt(window.localStorage.getItem("userId"));
        },

        getEmailOfCurUser: function(){
            return window.localStorage.getItem("username");
        }

    };
}]);

wanthaver.factory('Chat', ['$http', 'Auth', function ($http, Auth) {
    return {

        list: function(){
            return $http.get(server+'/v1/chat', Auth.getHeaderObject());
        },

        getOtherUser: function (chat) {
            return chat.userObject1.email == Auth.getEmailOfCurUser() ? chat.userObject2 : chat.userObject1;
        }
    };
}]);
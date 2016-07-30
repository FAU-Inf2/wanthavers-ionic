wanthaver.factory('Chat', ['$http', 'Auth', function ($http, Auth) {
    return {
        
        getMessagesByChatId: function(id){
            return $http.get(server+'/v1/chat/'+id, Auth.getHeaderObject());
        },

        sendMessage: function(id, msg){
            return $http.post(server+'/v1/chat/'+id, {body:msg}, Auth.getHeaderObject());
        },

        list: function(){
            return $http.get(server+'/v1/chat', Auth.getHeaderObject());
        },

        getOtherUser: function (chat) {
            if(chat.userObject1 == null || chat.userObject2 == null){
                return undefined;
            }
            return chat.userObject1.email == Auth.getEmailOfCurUser() ? chat.userObject2 : chat.userObject1;
        }
    };
}]);
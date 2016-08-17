wanthaver.factory('Chat', ['$http', 'Auth', function ($http, Auth) {
    return {
        
        getMessagesByChatId: function(id, last_creation_time){
            var limit = 20;
            var getString = "?limit="+limit;
            if(last_creation_time != undefined) {
                getString += "&last_creation_time=" + last_creation_time;
            }
            return $http.get(server+'/v1/chat/'+id+getString, Auth.getHeaderObject());
        },

        sendMessage: function(id, msg){
            return $http.post(server+'/v1/chat/'+id, {body:msg}, Auth.getHeaderObject());
        },

        list: function(){
            return $http.get(server+'/v1/chat', Auth.getHeaderObject());
        },

        getOtherUserByChatId: function(chatId){
            return $http.get(server+'/v1/chat/'+chatId+'/otheruser', Auth.getHeaderObject());
        },

        getOtherUser: function (chat) {
            if(chat.userObject1 == null || chat.userObject2 == null){
                return undefined;
            }
            return chat.userObject1.email == Auth.getEmailOfCurUser() ? chat.userObject2 : chat.userObject1;
        }
    };
}]);
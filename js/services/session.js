app.factory(
  "SessionService",
  [
    "CryptoService",
    "SocketService",
    function(CryptoService,SocketService) {
      var callbacks = [];
      var chatroom = "";
      var username = "";
      var key = "";
      var connected = false;
      var datetime = "";
      var loggedIn = false;
      var userlist = null;
      var datetime = Date.now();
      SocketService.registerCallback(
        function() {
          connected = true;
        },
        "onopen"
      );
      SocketService.registerCallback(
        function() {
          connected = false;
        },
        "onclose"
      );
      return {
        registerCallback:function(callback) {
          callbacks.push(callback);
        },
        login:function(c,u,d,l,k) {
          chatroom=c;
          username=u;
          datetime=d;
          userlist=l;
          key=k;
          CryptoService.setKey(key);
          loggedIn = true;
          for(var i=0;i<callbacks.length;i++) {
            try {
              callbacks[i]();
            }
            catch(e) {
              console.log(e)
            }
          }
        },
        setUsername:function(u) {
          username=u;
        },
        getFirstUserList:function() {
          return userlist;
        },
        getChatroom:function() {
          return chatroom;
        },
        getUsername:function() {
          return username;
        },
        getDatetime:function() {
          return datetime;
        },
        getGreeting:function() {
          return CryptoService.encrypt("hello world");
        },
        isConnected:function() {
          return connected;
        },
        loggedIn:function() {
          return loggedIn;
        }
      };
    }
  ]
);

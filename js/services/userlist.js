app.factory(
    "UserlistService",
    [
        function() {
          function answerCallbacks() {
            for(var i=0;i<callbacks.length;i++) {
              try {
                callbacks[i]();
              }
              catch(e){
                log(e);
              }
            }
          }
          var callbacks = [];
          var list = [];
          return {
            setUser:function(user) {
              try {
                list.push(user);
              }
              catch(e) {
                console.log(e);
              }
              finally {
                answerCallbacks();
              }
            },
            pushList:function(l) {
              list = l;
              answerCallbacks();
            },
            getUser:function(username) {
              var user = null;
              try {
                user = list[username];
              }
              catch(e) {
                console.log(e);
              }
              finally {
                return user;
              }
            },
            removeUser:function(username) {
              try {
                for(i=0;i<list.length;i++)
                  if(username==list[i].username)
                    list.splice(i,1);
              }
              catch(e) {
                console.log(e);
              }
              finally {
                answerCallbacks();
              }
            },
            getList:function() {
              return list;
            },
            registerCallback:function(callback) {
              callbacks.push(callback);
            }
          };
        }
    ]
);

app.factory(
  "MessagesService",
  [
    "SocketService",
    "CryptoService",
    function(
      SocketService,
      CryptoService
    ) {
      SocketService.registerCallback(
        function(e) {
          try {
            var json = JSON.parse(e.data);
            if(!("event" in json)) {
              json.content = CryptoService.decrypt(json.content);
              messages.push(json);
              sortMessages();
              for(var i=0;i<callbacks.length;i++) {
                try {
                  callbacks[i](json);
                }
                catch(ex) {
                  console.log(ex);
                }
              }
            }
          }
          catch(ex) {
            console.log(ex);
          }
        },
        "onmessage"
      );
      var callbacks=[];
      var messages = [];
      function sortMessages() {
        messages.sort(
          function(a,b) {
            return a.datetime - b.datetime;
          }
        );
      };
      return {
        getMessages:function() {
          return messages;
        },
        pushMessage:function(message) {
          messages.push(message);
          sortMessages();
        },
        send:function(message) {
          var json = {
            event:"message",
            message:message
          }
          SocketService.send(json);
        },
        registerCallback:function(callback) {
          callbacks.push(callback);
        }
      };
    }
  ]
);

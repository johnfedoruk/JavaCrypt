app.factory(
  "SocketService",
  [
    function() {
      // debugging only
      //var address = "ws://localhost:8080/chat/websocket";
      var address = "wss://javacrypt.net:8081/chat/websocket";
      var sock = new WebSocket(socketAddress);
      var callbacks={
        onopen:[],
        onmessage:[],
        onerror:[],
        onclose:[]
      };
      sock.onopen = function(e) {
        for(var i=0;i<callbacks["onopen"].length;i++) {
          try {
            callbacks["onopen"][i](e);
          }
          catch(ex){
            console.log(ex);
          }
        }
      };
      sock.onmessage = function(e) {
        console.log("rx :"+e.data);
        for(var i=0;i<callbacks["onmessage"].length;i++) {
          try {
            callbacks["onmessage"][i](e);
          }
          catch(ex){
            console.log(ex);
          }
        }
      }
      sock.onerror = function(e) {
        for(var i=0;i<callbacks["onerror"].length;i++){
          try {
            callbacks["onerror"][i](e);
          }
          catch(ex){
            console.log(ex);
          }
        }
      }
      sock.onclose = function(e) {
        for(var i=0;i<callbacks["onclose"].length;i++){
          try {
            callbacks["onclose"][i](e);
          }
          catch(ex){
            console.log(ex);
          }
        }
      }
      return {
        registerCallback:function(callback,type) {
          if(type in callbacks) {
            callbacks[type].push(callback);
          }
          else {
            console.log("\""+type+"\" not a valid callback");
          }
        },
        send:function(json) {
          var msg = JSON.stringify(json);
          console.log("tx: "+msg);
          try {
            sock.send(msg);
          }
          catch(e) {
            console.log(e);
          }
        }
      };
    }
  ]
);

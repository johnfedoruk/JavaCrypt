app.controller(
  'UserlistController',
  [
    "$scope",
    "$timeout",
    "UserlistService",
    "SessionService",
    "SocketService",
    "MessagesService",
    function($scope,$timeout,UserlistService,SessionService,SocketService,MessagesService) {
      UserlistService.registerCallback(
        function() {
          $scope.users=UserlistService.getList();
        }
      );
      SessionService.registerCallback(
        function() {
          UserlistService.pushList(
            SessionService.getFirstUserList()
          );
        }
      );
      SocketService.registerCallback(
        function(e) {
          try {
            var json = JSON.parse(e.data);
            if(!("event" in json))
              return;
            if(json.event=="logout") {
              UserlistService.removeUser(json.username);
              MessagesService.pushMessage(json);
            }
            else if(json.event=="login") {
              var user = {
                username:json.username,
                datetime:json.datetime
              };
              UserlistService.setUser(user);
              if(json.username!=$scope.me)
                MessagesService.pushMessage(json);
            }
          }
          catch(ex) {
            console.log(ex);
          }
        },
        "onmessage"
      );
      $scope.now=Date.now();
      var tick = function() {
        $scope.now = Date.now();
        $timeout(
          tick,
          1000
        );
      }
      $timeout(
        tick,
        6666
      );
    }
  ]
);

app.controller(
  'MessagesController',
  [
    "$scope",
    "$timeout",
    "$mdToast",
    "CryptoService",
    "SessionService",
    "MessagesService",
    function(
      $scope,
      $timeout,
      $mdToast,
      CryptoService,
      SessionService,
      MessagesService
    ) {
      $scope.messages = MessagesService.getMessages();
      $scope.last = "";
      $scope.input = "";
      $scope.send = function() {
        var strlen = $scope.input.length;
        var message = {
          username: $scope.me,
          content: CryptoService.encrypt($scope.input)
        };
        $scope.input = "";
        if($scope.mobile) {
          var sd = false;
          var raw = document.getElementById("messageArea");
          var x = document.getElementById('chatInput');
          x.disabled = true;
          $timeout(
            function() {
              x.disabled = false;
            },
            666
          );
          if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight - 100)
            sd = true;
          for(var i=0;i<=666;i+=111) {
            $timeout(
              function() {
                if(sd)
                  raw.scrollTop = raw.scrollHeight;
              },
              i
            );
          }
        }
        if(strlen>0)
          MessagesService.send(message);
      };
      MessagesService.registerCallback(
        function(json) {
          $timeout(
            function() {
              var raw = document.getElementById("messageArea");
              var scroll;
              if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight - 100)
                $timeout(
                  function() {
                    raw.scrollTop = raw.scrollHeight;
                  }
                );
              else if(json.username!=SessionService.getUsername()) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('New Message!')
                    .position("top right")
                    .hideDelay(2000)
                    .theme("toast")
                    //.action(string)
                    .parent(document.getElementById("toaster"))
                );
              }
            }
          )
        }
      );
    }
  ]
);

app.controller(
  'SocketController',
  function($scope,SocketService) {
    $scope.data = JSON.stringify(SocketService);
  }
);

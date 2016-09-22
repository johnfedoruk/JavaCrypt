 app.controller(
 "MainController",
  [
    '$scope',
    '$location',
    '$mdSidenav',
    'SessionService',
    'LinksService',
    function($scope,$location,$mdSidenav,SessionService,LinksService) {
      SessionService.registerCallback(
        function() {
          $scope.loggedIn = SessionService.loggedIn();
          $scope.username = SessionService.getUsername();
          $scope.chatroom = SessionService.getChatroom();
          $scope.datetime = SessionService.getDatetime();
          if($scope.loggedIn==false) {
            alert("hmm.. Something strange has happened. Please let us know");
            location.reload() // something bad has happened
          }
        }
      );
      $scope.path = LinksService.getPath();
      LinksService.registerCallback(
        function() {
          $scope.path = LinksService.getPath();
        }
      );
      $scope.mobile = (window.innerWidth <= 800 && window.innerHeight <= 600);
      $scope.toggleSideNav = function(id) {
        $mdSidenav(id).toggle();
      };
      $scope.openSidenav = function(id) {
        $mdSidenav(id).open();
      };
      $scope.closeSidenav = function(id) {
        $mdSidenav(id).close();
      }
    }
  ]
);

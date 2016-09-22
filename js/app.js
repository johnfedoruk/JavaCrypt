var app = angular.module(
  "MyApp",
  [
    'ngMaterial',
    'ngMdIcons',
    'ngRoute'
  ]
);

app.config(
  function($mdThemingProvider) {
    $mdThemingProvider.theme('chat')
    .primaryPalette('red')
    .accentPalette('blue');
    $mdThemingProvider.theme('toast');
  }
);

app.controller(
  "UICtrl",
  [
    '$scope',
    '$mdSidenav',
    function($scope,$mdSidenav) {
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
)

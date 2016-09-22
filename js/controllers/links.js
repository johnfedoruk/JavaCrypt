app.controller(
  "LinksController",
  [
    "$scope",
    "$location",
    "LinksService",
    function($scope,$location,LinksService) {
      $scope.links = LinksService.getLinks();
      $scope.openLink=function(path,tb) {
        if(tb)
          window.open(
            path,
            '_blank'
          );
        else {
          $location.path(path);
          LinksService.setPath(path);
        }
      };
    }
  ]
);

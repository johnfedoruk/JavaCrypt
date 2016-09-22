app.config(
  function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./templates/main.html"
    })
    .when("/about", {
        templateUrl : "./templates/about.html"
    })
    .when("/settings", {
        templateUrl : "./templates/settings.html"
    });
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/boxes/boxes.html',
            controller: 'BoxesController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
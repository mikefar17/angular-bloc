(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true, // disables #! hashbangs
                requireBase: false // avoid $location error
        });
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'  
            })
            .state('collection', {
                url: '/collection',
                templateUrl: '/templates/collection.html'
<<<<<<< HEAD
            });
=======
    });
>>>>>>> assignment-ng-routing-and-states
    }
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
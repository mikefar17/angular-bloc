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
        });
    }
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
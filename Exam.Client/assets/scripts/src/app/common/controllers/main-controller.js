(function () {
    'use strict';

    function MainController($location, auth, identity, logService) {
        var vm = this;

        vm.identity = identity;
        vm.logout = function () {
            auth.logout()
                .then(
                    function () {
                        logService.log('Successful logout.', true);
                        $location.path('/');
                    },
                    function (error) {
                        logService.error(error.Message, true);
                    }
            )
        }
    }

    angular
        .module('myApp.controllers')
        .controller('MainController', ['$location', 'auth', 'identity', 'logService', MainController])
}())
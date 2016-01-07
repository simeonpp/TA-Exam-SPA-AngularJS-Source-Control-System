(function () {
    'use strict';

    function LoginController($location, auth, logService) {
        var vm = this;

        vm.login = function (user, loginForm) {
            if (loginForm.$valid) {
                logService.log('Log user in...')
                auth.login(user)
                    .then(
                        function (responceStatus) {
                            if (responceStatus) {
                                logService.log(user.username + ' succesfully logged in.', true);
                                $location.path('/');
                            } else {
                                logService.log('No access token was returned by the server.', true);
                            }
                        },
                        function (err) {
                            logService.error(err.error_description, true);
                    })
            }
            else {
                logService.error('Username and password are required fields!')
            }
        }
    }

    angular
        .module('myApp.controllers')
        .controller('LoginController', ['$location', 'auth', 'logService', LoginController])
}())
(function () {
    'use strict';

    function RegisterController($location, auth, logService) {
        var vm = this;

        vm.register = function register(user, registrationForm) {
            if (registrationForm.$valid) {
                logService.log('Registering user...');
                auth.register(user)
                    .then(
                        function () {
                            logService.log(user.email + ' succesfully registered.', true);
                            $location.path('/');
                        },
                        function (err) {
                            var error = err.ModelState;
                            if (error && error[Object.keys(error)[0]][0]) {
                                error = error[Object.keys(error)[0]][0];
                            }
                            else {
                                error = err.message;
                            }
                        
                            logService.error(error, true);
                    })
            }
        }
    }

    angular
        .module('myApp.controllers')
        .controller('RegisterController', ['$location', 'auth', 'logService', RegisterController])
}())
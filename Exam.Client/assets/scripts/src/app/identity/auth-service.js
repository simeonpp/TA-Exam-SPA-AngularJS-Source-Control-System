(function () {
    'use strict';

    function auth($q, dataService, identity, baseUrl) {
        var usersApi = 'api/account/'

        return {
            register: function (user) {
                return dataService.post(usersApi + 'register', user);
            },
            login: function (user) {
                var deferred = $q.defer();

                user['grant_type'] = 'password';
                dataService.post('Token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(
                        function (tokenData) {
                            if (tokenData["access_token"]) {
                                identity.setCurrentUser(tokenData);
                                deferred.resolve(true);
                            }
                            else {
                                deferred.resolve(false);
                            }
                        },
                        function (error) {
                            deferred.reject(error);    
                        }
                    );

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                dataService.authorizedPost(usersApi + 'logout', {})
                    .then(
                        function () {
                            identity.setCurrentUser(undefined);
                            deferred.resolve();
                        },
                        function (error) {
                            deferred.reject(error);
                        }
                    );

                return deferred.promise;
            },
            isAuthenticated: function () {
                if (identity.isAuthenticated()) {
                    return true;
                }
                else {
                    return $q.reject('not authorized');
                }
            }
        }
    }

    angular
        .module('myApp.services')
        .factory('auth', ['$q', 'dataService', 'identity', 'baseUrl', auth]);
}());
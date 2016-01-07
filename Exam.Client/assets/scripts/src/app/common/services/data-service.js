(function () {
    'use strict';

    function dataService($http, $q, authorization, baseurl) {

        function get(url, params) {
            var defered = $q.defer();

            $http.get(baseurl + url, {params: params})
                .then(
                function (response) {
                    defered.resolve(response.data);
                },
                function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        function authorizedGet(url, params) {
            var defered = $q.defer(),
                headers = authorization.getAuthorizationHeader();

            $http.get(baseurl + url, { headers: headers }, { params: params })
                .then(
                function (response) {
                    defered.resolve(response.data);
                },
                function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, data, headers) {
            headers = headers || {};

            var defered = $q.defer();

            $http.post(baseurl + url, data, { headers: headers })
                .then(
                    function (response) {
                        defered.resolve(response.data);
                    },
                    function (error) {
                        defered.reject(error.data);
                    }
                )

            return defered.promise;
        }

        function authorizedPost(url, data) {
            var defered = $q.defer(),
                headers = authorization.getAuthorizationHeader();

            $http.post(baseurl + url, data, { headers: headers })
                .then(
                    function (response) {
                        defered.resolve(response.data);
                    },
                    function (error) {
                        defered.reject(error.data);
                    }
                )

            return defered.promise;
        }

        function authorizedPut(url, data) {
            var defered = $q.defer(),
                headers = authorization.getAuthorizationHeader();

            $http.put(baseurl + url, data, { headers: headers })
                .then(
                    function (response) {
                        defered.resolve(response.data);
                    },
                    function (error) {
                        defered.reject(error.data);
                    }
                )

            return defered.promise;
        }

        return {
            get: get,
            authorizedGet: authorizedGet,
            post: post,
            authorizedPost: authorizedPost,
            authorizedPut: authorizedPut
        }
    }

    angular
        .module('myApp.services')
        .factory('dataService', ['$http', '$q', 'authorization', 'baseUrl', dataService])
}());
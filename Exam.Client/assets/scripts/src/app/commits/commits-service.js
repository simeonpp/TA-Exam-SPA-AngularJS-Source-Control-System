(function () {
    'use strict';

    function commitsService(dataService) {
        var COMMITS_URL = 'api/commits';

        function getPublic() {
            return dataService.get(COMMITS_URL);
        }

        function getById(commitId) {
            return dataService.authorizedGet(COMMITS_URL + '/' + commitId);
        }

        function getByProjectId(projectId) {
            return dataService.authorizedGet(COMMITS_URL + '/byproject/' + projectId);
        }

        function add(commit) {
            return dataService.authorizedPost(COMMITS_URL, commit);
        }

        function searchCommits(projectId, request) {
            var queryString = "",
                index = 1;

            for (var property in request) {
                if (request.hasOwnProperty(property)) {
                    if (index == 1) {
                        queryString = '?' + property + '=' + request[property];
                    } else {
                        queryString += '&' + property + '=' + request[property];
                    }
                }

                index++;
            }
            
            return dataService.authorizedGet(COMMITS_URL + '/byproject/' + projectId + queryString, request);
        }

        return {
            getPublic: getPublic,
            getById: getById,
            getByProjectId: getByProjectId,
            add: add,
            searchCommits: searchCommits
        }
    }

    angular
        .module('myApp.services')
        .factory('commitsService', ['dataService', commitsService])
}());
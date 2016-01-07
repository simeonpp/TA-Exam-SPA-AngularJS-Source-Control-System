(function () {
    'use strict';

    function projectService(dataService) {
        var PROJECTS_URL = 'api/projects';

        function getPublic() {
            return dataService.get(PROJECTS_URL);
        }

        function getAll() {
            return dataService.authorizedGet(PROJECTS_URL + '/all');
        }

        function searchProjects(request) {
            return dataService.get(PROJECTS_URL + '/all', request);
        }

        function getById(projectId) {
            return dataService.authorizedGet(PROJECTS_URL + '/' + projectId);
        }

        return {
            getPublic: getPublic,
            getAll: getAll,
            searchProjects: searchProjects,
            getById: getById
        }
    }

    angular
        .module('myApp.services')
        .factory('projectService', ['dataService', projectService])
}());
(function () {
    'use strict';

    function collaboratorsService(dataService) {
        var COLLABORATORS_URL = 'api/projects';

        function addByProjectId(projectId, collaborator) {
            return dataService.authorizedPut(COLLABORATORS_URL + '/' + projectId, collaborator);
        }

        function getByProjectId(projectId) {
            return dataService.authorizedGet(COLLABORATORS_URL + '/collaborators/' + projectId);
        }

        return {
            addByProjectId: addByProjectId,
            getByProjectId: getByProjectId
        }
    }

    angular
        .module('myApp.services')
        .factory('collaboratorsService', ['dataService', collaboratorsService])
}());
(function () {
    'use strict';

    function ProjectsAddController($location, dataService, logService) {
        var vm = this,
            PROJECTS_URL = 'api/projects',
            LICENSES_URL = 'api/licenses';

        dataService.authorizedGet(LICENSES_URL)
            .then(
                function (licenses) {
                    vm.licenses = licenses;
                },
                function (error) {
                    logService.error(error, true);
                }
            )

        vm.createProject = function (project, createProjectForm) {
            if (createProjectForm.$invalid) {
                logService.error('Form is invalid.', true);
                return;
            }

            dataService.authorizedPost(PROJECTS_URL, project)
                .then(
                    function (response) {
                        logService.log(project.name + ' was succesfully created.', true);
                        $location.path('/projects');
                    }, function (error) {
                        logService.error(error, true);
                    }
                )
        }
    }

    angular
        .module('myApp.controllers')
        .controller('ProjectsAddController', ['$location', 'dataService', 'logService', ProjectsAddController])
}());
(function () {
    'use strict';

    function ProjectsListController(identity, projectService, dataService) {
        var vm = this,
            PROJECTS_URL = 'api/projects';

        vm.request = {};
        vm.request.page = 1;
        vm.request.onlyPublic = true;
        vm.identity = identity;

        if (identity.isAuthenticated()) {
            projectService.getAll()
            .then(
                function (projects) {
                    vm.projects = projects;
                },
                function (error) {
                    logService.error(error, true);
                }
            )

            vm.filterProjects = function () {
                var request = vm.request || {};

                projectService.searchProjects(request)
                    .then(function (filteredProjects) {
                        vm.projects = filteredProjects;
                    });
            }

            vm.prevPage = function () {
                var currentPage = vm.request.page,
                    nextPage;

                if (currentPage <= 1) {
                    nextPage = 1;
                } else {
                    nextPage = currentPage - 1;
                }

                vm.request.page = nextPage;
                vm.filterProjects();
            }

            vm.nextPage = function () {
                var currentPage = vm.request.page,
                    nextPage;

                nextPage = currentPage + 1;

                vm.request.page = nextPage;
                vm.filterProjects();
            }
        } else {
            projectService.getPublic()
            .then(
                function (projects) {
                    vm.projects = projects;
                },
                function (error) {
                    logService.error(error, true);
                }
            )
        }

        
    }

    angular
        .module('myApp.controllers')
        .controller('ProjectsListController', ['identity', 'projectService', 'dataService', ProjectsListController])
}());
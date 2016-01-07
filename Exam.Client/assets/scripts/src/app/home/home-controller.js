(function () {
    'use strict';

    function HomeController(identity, statisticsSerivce, projectService, commitsService, logService) {
        var vm = this;


        vm.homeMessage = 'Source Control System Angular JS Client';
        vm.identity = identity;

        statisticsSerivce.getStats()
            .then(
                function (statistics) {
                    vm.stats = statistics;
                }, 
                function (error) {
                    logService.error(error);
                }
            )

        projectService.getPublic()
            .then(
                function (projects) {
                    vm.projects = projects;
                },
                function (error) {
                    logService.error(error, true);
                }
            )

        commitsService.getPublic()
            .then(
                function (commits) {
                    vm.commits = commits;
                },
                function (error) {
                    logService.error(error, true);
                }
            )
    }

    angular
        .module('myApp.controllers')
        .controller('HomeController', ['identity', 'statisticsSerivce', 'projectService', 'commitsService', 'logService', HomeController]);

}())
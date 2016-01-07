(function () {
    'use strict';

    function CommitAddController($location, $routeParams, commitsService, logService) {
        var vm = this,
            projectId = $routeParams.id;

        vm.projectId = projectId;

        vm.addCommit = function (commit, addCommitForm) {
            if (addCommitForm.$invalid) {
                logService.error('Form is invalid.', true);
                return;
            }

            commit.projectId = projectId;            
            commitsService.add(commit)
                .then(
                    function (commitId) {
                        logService.log(' Commit was succesfully added.', true);
                        $location.path('/projects');
                    },
                    function (error) {
                        logService.error(error, true);
                    }
                );
        }
    }

    angular
        .module('myApp.controllers')
        .controller('CommitAddController', ['$location', '$routeParams', 'commitsService', 'logService', CommitAddController])
}());
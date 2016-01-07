(function () {
    'use strict';

    function CommitDetailsController($routeParams, commitsService, logService) {
        var vm = this,
            commitId = $routeParams.id;

        commitsService.getById(commitId)
            .then(
                function (commitInfo) {
                    vm.commitInfo = commitInfo;
                },
                function (error) {
                    logService.error(error, true);
                }
            )
    }

    angular
        .module('myApp.controllers')
        .controller('CommitDetailsController', ['$routeParams', 'commitsService', 'logService', CommitDetailsController])
}());
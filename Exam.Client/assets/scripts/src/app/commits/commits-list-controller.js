(function () {
    'use strict';

    function CommitsListController(identity, commitsService) {
        var vm = this;

        vm.identity = identity;

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
        .controller('CommitsListController', ['identity', 'commitsService', CommitsListController])
}());
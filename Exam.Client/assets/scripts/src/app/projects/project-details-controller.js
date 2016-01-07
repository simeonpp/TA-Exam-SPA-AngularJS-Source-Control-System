(function () {
    'use strict';

    function ProjectDetailsController($http, authorization, $routeParams, $location, identity, projectService, commitsService, collaboratorsService, logService) {
        var vm = this,
            projectId = $routeParams.id

        vm.request = {};
        vm.commitClientFilter = {};
        vm.commitClientFilter.onlyCurrentUser = false;
        vm.request.page = 1;

        vm.identity = identity;

        projectService.getById(projectId)
            .then(
                function (projectInfo) {
                    vm.projectInfo = projectInfo;
                },
                function (error) {
                    logService.error(error, true);
                }
            )

        commitsService.getByProjectId(projectId)
            .then(
                function (commits) {
                    vm.commits = commits;
                },
                function (error) {
                    logService.error(error, true);
                }
            )

        collaboratorsService.getByProjectId(projectId)
            .then(
                function (collaborators) {
                    vm.collaborators = collaborators;

                    vm.allowedToAddCollaborators = false;
                    var currentUser = identity.getCurrentUser();

                    if (isInArray(currentUser.userName, collaborators)) {
                        vm.allowedToAddCollaborators = true;
                    }
                },
                function (error) {
                    logService.error(error, true);
                }
            );

        vm.filterCommits = function () {
            var request = vm.request || {};

            commitsService.searchCommits(projectId, request)
                .then(function (serverFilteredCommits) {
                                        
                    var i,
                        length,
                        currentCommit,
                        currentCommitDate,
                        clientSelectedFromDate,
                        clientSelectedToDate,
                        tempFilteredCommits = [],
                        clientFilteredCommits = [],
                        currentUserName = identity.getCurrentUser().userName;

                    length = serverFilteredCommits.length;
                    for (i = 0; i < length; i++) {
                        currentCommit = serverFilteredCommits[i];
                        currentCommitDate = new Date(currentCommit.CreatedOn);
                        clientSelectedFromDate = new Date(vm.commitClientFilter.fromCreationTime);
                        clientSelectedToDate = new Date(vm.commitClientFilter.toCreationTime);

                        if (vm.commitClientFilter.fromCreationTime && vm.commitClientFilter.toCreationTime) {
                            if (currentCommitDate >= clientSelectedFromDate && currentCommitDate <= clientSelectedToDate) {
                                tempFilteredCommits.push(currentCommit);
                            }
                        } else {
                            if (vm.commitClientFilter.fromCreationTime) {   
                                if (currentCommitDate >= clientSelectedFromDate) {
                                    tempFilteredCommits.push(currentCommit);
                                }
                            }

                            if (vm.commitClientFilter.toCreationTime) {
                                if (currentCommitDate <= clientSelectedToDate) {
                                    tempFilteredCommits.push(currentCommit);
                                }
                            }
                        }                        
                    }

                    length = tempFilteredCommits.length;
                    if (vm.commitClientFilter.fromCreationTime == undefined && vm.commitClientFilter.toCreationTime == undefined && vm.commitClientFilter.onlyCurrentUser) {
                        length = serverFilteredCommits.length;
                        for (i = 0; i < length; i++) {
                            currentCommit = serverFilteredCommits[i];
                            if (currentCommit.UserName == currentUserName) {
                                clientFilteredCommits.push(currentCommit);
                            }
                        }
                    } else if (vm.commitClientFilter.onlyCurrentUser) {
                        for (i = 0; i < length; i++) {
                            currentCommit = tempFilteredCommits[i];

                            if (currentCommit.UserName == currentUserName) {
                                clientFilteredCommits.push(currentCommit);
                            }
                        }
                    } else {
                        clientFilteredCommits = tempFilteredCommits;
                    }

                    if (!vm.commitClientFilter.fromCreationTime && !vm.commitClientFilter.toCreationTime && !vm.commitClientFilter.onlyCurrentUser) {
                        clientFilteredCommits = serverFilteredCommits;
                    }

                    vm.commits = clientFilteredCommits;
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
            vm.filterCommits();
        }

        vm.nextPage = function () {
            var currentPage = vm.request.page,
                nextPage;

            nextPage = currentPage + 1;

            vm.request.page = nextPage;
            vm.filterCommits();
        }

        vm.addCollaborator = function (collaborator, addCollaboratorForm) {
            if (addCollaboratorForm.$invalid) {
                logService.error('Form is invalid.', true);
                return;
            }
            
            collaboratorsService.addByProjectId(projectId, collaborator.email)
                .then(
                    function () {
                        logService.log(collaborator.emal + ' was succesfully added to collaborators.', true);
                        $location.path('/projects/' + projectId);
                    },
                    function (error) {
                        logService.error(error, true);
                    }
                );
        }
    }

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    function appendTransform(defaults, transform) {

        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults];

        // Append the new transformation to the defaults
        return defaults.concat(transform);
    }

    angular
        .module('myApp.controllers')
        .controller('ProjectDetailsController', ['$http', 'authorization', '$routeParams', '$location', 'identity', 'projectService', 'commitsService', 'collaboratorsService', 'logService', ProjectDetailsController])
}());
(function () {
    'use strict';

    function config($routeProvider, $locationProvider) {
        var CONTROLLER_VIEW_MODEL_NAME = 'vm',
            VIEWS_PREFIX = 'views/partials/';

        $locationProvider.html5Mode(true);

        var routeResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    if (typeof auth.isAuthenticated() == 'boolean' && auth.isAuthenticated() == true) {
                        return true;
                    }

                    return $q.reject('not authorized');
                }]
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: VIEWS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/register', {
                templateUrl: VIEWS_PREFIX + 'identity/register.html',
                controller: 'RegisterController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/login', {
                templateUrl: VIEWS_PREFIX + 'identity/login.html',
                controller: 'LoginController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects', {
                templateUrl: VIEWS_PREFIX + 'projects/projects-list.html',
                controller: 'ProjectsListController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects/add', {
                templateUrl: VIEWS_PREFIX + '/projects/project-add.html',
                controller: 'ProjectsAddController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/:id', {
                templateUrl: VIEWS_PREFIX + 'projects/project-details.html',
                controller: 'ProjectDetailsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/:id/addcommits', {
                templateUrl: VIEWS_PREFIX + 'commits/commit-add.html',
                controller: 'CommitAddController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/commits', {
                templateUrl: VIEWS_PREFIX + 'commits/commits-list.html',
                controller: 'CommitsListController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/commits/:id', {
                templateUrl: VIEWS_PREFIX + 'commits/commit-details.html',
                controller: 'CommitDetailsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/unauthorized', {
                templateUrl: VIEWS_PREFIX + 'common/not-authorized.html',
                controller: 'NotAuthorizedController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .otherwise({ redirectTo: '/' });
    }

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        });
    };

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.filters', []);
    angular.module('myApp.controllers', ['myApp.services']);

    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.directives', 'myApp.controllers', 'myApp.filters', 'kendo.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run]);
}());
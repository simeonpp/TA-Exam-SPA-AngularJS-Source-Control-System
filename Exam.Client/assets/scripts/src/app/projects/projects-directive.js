(function () {
    'use strict';

    function projectDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/projects-directive.html'
        }
    }
    
    angular.module('myApp.directives')
        .directive('projectsDirective', [projectDirective])
}());
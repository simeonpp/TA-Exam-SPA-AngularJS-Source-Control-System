(function () {
    'use strict';

    function collaboratorsDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/collaborators-directive.html'
        }
    }
    
    angular.module('myApp.directives')
        .directive('collaboratorsDirective', [collaboratorsDirective])
}());
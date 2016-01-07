(function () {
    'use strict';

    function commitsDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/commits-directive.html'
        }
    }
    
    angular.module('myApp.directives')
        .directive('commitsDirective', [commitsDirective])
}());
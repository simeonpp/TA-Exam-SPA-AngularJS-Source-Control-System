(function () {
    'use strict';

    function NotAuthorizedController(logService) {
        var vm = this;

        logService.warn('You have not access to this page due to it requires authentication.', true);
    }

    angular
        .module('myApp.controllers')
        .controller('NotAuthorizedController', ['logService', NotAuthorizedController])
}())
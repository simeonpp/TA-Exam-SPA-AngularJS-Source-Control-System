(function () {
    'use strict';

    var log = function (notificationService) {

        function log(message, notifyUser) {
            notifyUser = notifyUser | false;

            console.log(message);

            if (notifyUser) {
                notificationService.success(message);
            }
        }

        function warn(message, notifyUser) {
            notifyUser = notifyUser | false;

            console.warn(message);

            if (notifyUser) {
                notificationService.warning(message);
            }
        }

        function error(message, notifyUser) {
            notifyUser = notifyUser | false;

            console.error(message);

            if (notifyUser) {
                notificationService.error(message);
            }
        }

        return {
            log: log,
            error: error,
            warn: warn
        }
    }

    angular
        .module('myApp.services')
        .factory('logService', ['notificationService', log]);
}())
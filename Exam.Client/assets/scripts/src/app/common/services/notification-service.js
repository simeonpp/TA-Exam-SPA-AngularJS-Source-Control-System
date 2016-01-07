(function () {
    'use strict';

    function notificationService(toastr) {

        function success(message) {
            toastr.success(message);
        }

        function error(message) {
            toastr.error(message);
        }

        function warning(message) {
            toastr.warning(message);
        }

        // Immediately remove current toasts without using animation
        function remove() {
            toastr.remove();
        }

        // Remove current toasts using animation
        function clear() {
            toastr.clear();
        }

        function config(closeMethod, closeDuration, closeEasing) {
            closeMethod = closeMethod || 'fadeOut';
            closeDuration = closeDuration || 300;
            closeEasing = closeEasing || 'swing';

            toastr.options.closeMethod = closeMethod;
            toastr.options.closeDuration = closeDuration;
            toastr.options.closeEasing = closeEasing;
        }

        return {
            success: success,
            warning: warning,
            error: error,
            remove: remove,
            clear: clear,
            configuration: config
        }
    }

    angular
        .module('myApp.services')
        .factory('notificationService', ['toastr', notificationService])
}());
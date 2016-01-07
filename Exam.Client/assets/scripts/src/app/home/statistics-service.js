(function () {
    'use strict';

    function statisticsSerivce($q, dataService) {
        var STATISTICS_URL = 'api/statistics',
            cachedStatistics;

        function getStats() {
            if (cachedStatistics) {
                return $q.when(cachedStatistics);
            }

            return dataService.get(STATISTICS_URL)
                .then(function (response) {
                    cachedStatistics = response;
                    return cachedStatistics;
                })
        }

        return {
            getStats: getStats
        }
    }

    angular
        .module('myApp.services')
        .factory('statisticsSerivce', ['$q', 'dataService', statisticsSerivce])
}());
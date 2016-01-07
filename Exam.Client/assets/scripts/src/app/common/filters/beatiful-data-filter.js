(function () {
    'use strict';

    function beatifulDateFilter() {
        return function (input) {
            var date = new Date(input),
                result,
                monthNames = [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec"
                            ];

            var monthAsString = monthNames[date.getMonth()],
                day = date.getDate(),
                year = date.getFullYear(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();

            result = monthAsString + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ';
            return result;
        }
    }

    angular
        .module('myApp.filters')
        .filter('beatifulDate', beatifulDateFilter);
}());
/*global todomvc */

var moduleService = function($http) {
    return {
        get: function (callback) {
            $http({method: 'GET', url: 'http://127.0.0.1:4567/modules'}).
            success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback([]);
            });
        }
        // }, post: function (data) {
        //     $http({method: 'POST', url: 'http://127.0.0.1:4567/deadlines', data: data}).
        //     success(function(data, status, headers, config) {
        //         console.log("Yay!");
        //     }).
        //     error(function(data, status, headers, config) {
        //         console.log("Nay :(");
        //     });
        // }
    };
};
todomvc.factory('moduleService', ['$http', moduleService]);
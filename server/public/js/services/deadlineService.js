/*global todomvc */

var deadlineService = function($http) {
    return {
        get: function (callback) {
            $http({method: 'GET', url: 'http://127.0.0.1:4567/deadlines'}).
            success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback([]);
            });
        }, post: function (data) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/deadlines', data: {module: data.module.key, name: data.name, due: data.due}}).
            success(function(data, status, headers, config) {
                console.log("Yay!");
            }).
            error(function(data, status, headers, config) {
                console.log("Nay :(");
            });
        }, getModules: function (callback) {
            $http({method: 'GET', url: 'http://127.0.0.1:4567/modules'}).
            success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback([]);
            });
        }
    };
};
todomvc.factory('deadlineService', ['$http', deadlineService]);
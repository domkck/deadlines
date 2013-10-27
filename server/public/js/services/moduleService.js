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
        }, post: function (data, callback) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/modules', data: data}).
            success(function(data, status, headers, config) {
                callback(data.module_model);
            }).
            error(function(data, status, headers, config) {
                console.log("Nay :(");
                callback();
            });
        }, addToUser: function (moduleId, callback) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/users/add_module/'+moduleId}).
            success(function(data, status, headers, config) {
                callback(data);
            });
        }
    };
};
todomvc.factory('moduleService', ['$http', moduleService]);
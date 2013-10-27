/*global todomvc */

var userService = function($http) {
    return {
        login: function (data, callback) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/login', data: data}).
            success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback();
            });
        }, post: function (data, callback) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/users', data: data}).
            success(function(data, status, headers, config) {
                callback(data.user);
            }).
            error(function(data, status, headers, config) {
                console.log("Nay :(");
                callback();
            });
        }
    };
};
todomvc.factory('userService', ['$http', userService]);
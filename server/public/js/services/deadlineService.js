/*global todomvc */

var deadlineService = function($http) {
    return {
        get: function (callback) {
            $http({method: 'GET', url: 'http://127.0.0.1:4567/deadlines'}).
            success(function(data, status, headers, config) {
                for (var i in data) {
                    var deadline = data[i];
                    var dueDate = Date.parse(deadline.due);
                    deadline.due = moment(dueDate).fromNow() + " (" + moment(dueDate).format("DD/MM/YY HH:mm") + ")" ;
                    deadline.dueDate = dueDate;
                }
                data = _.sortBy(data, function (item) {return item.dueDate;});
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback([]);
            });
        }, post: function (data) {
            $http({method: 'POST', url: 'http://127.0.0.1:4567/deadlines', data: {module: data.module.key, name: data.name, due: data.dueDate}}).
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